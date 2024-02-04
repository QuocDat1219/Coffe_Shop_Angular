import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { BlogServiceService } from 'src/app/services/blog-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  onAddBlog = new EventEmitter();
  onUpdateBlog = new EventEmitter();
  blogForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;
  blogCategories:any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private FormBuilder:FormBuilder,
    private snackbarService:SnackbarService,
    private dialog:MatDialogRef<BlogComponent>,
    private blogService:BlogServiceService,
    private blogCategoryService:BlogCategoryService,
  ) { }

  ngOnInit(): void {
    this.blogForm = this.FormBuilder.group({
      title: [null,[Validators.required]],
      image: [null,[Validators.required]],
      description: [null,[Validators.required]],
      blogCategoryId:[null,[Validators.required]],
    })
    if(this.dialogData.action === "Edit"){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.blogForm.patchValue(this.dialogData.data);
    }

    this.getBlogs();
  }

  getBlogs() {
    this.blogCategoryService.getAllBlogCategory().subscribe((response:any) => {
      this.blogCategories = response;
    },(error:any) => {
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    });
  }

  handleSubmit() {
    if(this.dialogAction === "Edit"){
      this.edit();
    }else{
      this.add();
    }
  }

  add(){
    var formData = this.blogForm.value;
    var data = {
      title: formData.title,
      image: formData.image,
      description: formData.description,
      blogCategoryId: formData.blogCategoryId
    }

    this.blogService.add(data).subscribe((response:any) => {
      this.dialog.close();
      this.onAddBlog.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any) => {
      this.dialog.close();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      
    });
  }

  edit(){
    var formData = this.blogForm.value;
    var data = {
      id: this.dialogData.data.id,
      title: formData.title,
      image: formData.image,
      description: formData.description,
      blogCategoryId: formData.blogCategoryId
    }

    this.blogService.update(data).subscribe((response:any) => {
      this.dialog.close();
      this.onUpdateBlog.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any) => {
      this.dialog.close();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      
    });
  }

}


