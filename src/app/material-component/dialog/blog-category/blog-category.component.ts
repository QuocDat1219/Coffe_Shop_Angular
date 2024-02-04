import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent implements OnInit {

  onAddBlogCategory = new EventEmitter();
  onEditBlogCategory = new EventEmitter();
  blogCategoryForm:any = FormGroup;
  dialogAction:any="Add";
  action:any="Add";
  responseMessage:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder:FormBuilder,
    public dialog:MatDialogRef<BlogCategoryComponent>,
    private snackbarService:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private blogCategoryService:BlogCategoryService
  ) { }

  ngOnInit(): void {
    this.blogCategoryForm = this.formBuilder.group({
        name: [null,[Validators.required]]
    });
    if(this.dialogData.action === "Edit"){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.blogCategoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }else{
      this.add();
    }
  }

  add() {
    var formData = this.blogCategoryForm.value;
    var data = {
      name : formData.name,
    }
    this.blogCategoryService.add(data).subscribe((response:any)=>{
      this.dialog.close();
      this.onAddBlogCategory.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error)=>{
      this.dialog.close();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;

      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit() {
    var formData = this.blogCategoryForm.value;
    var data = {
      id: this.dialogData.data.id,
      name : formData.name,
    }
    this.blogCategoryService.update(data).subscribe((response:any)=>{
      this.dialog.close();
      this.onEditBlogCategory.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error)=>{
      this.dialog.close();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;

      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
