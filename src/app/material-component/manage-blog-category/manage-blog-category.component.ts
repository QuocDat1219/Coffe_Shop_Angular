import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogCategoryService } from 'src/app/services/blog-category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { BlogCategoryComponent } from '../dialog/blog-category/blog-category.component';
import { error } from 'console';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-blog-category',
  templateUrl: './manage-blog-category.component.html',
  styleUrls: ['./manage-blog-category.component.scss']
})
export class ManageBlogCategoryComponent implements OnInit {

  displayedColumns:string[] = ['name','edit'];
  dataSource:any;
  responseMessage:any;

  constructor(
    private blogCategoryService:BlogCategoryService,
    private ngxService:NgxUiLoaderService,
    public dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.dataTable();
  }

  dataTable() {
    this.blogCategoryService.getAllBlogCategory().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
      console.log(response);
      
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    });
  }

  applyFilter(envent:Event){
    const filterValue = (envent.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add",
    };
    const dialogRef = this.dialog.open(BlogCategoryComponent,dialogConfig);
     this.router.events.subscribe(() => {
        dialogRef.close();
     })

     const sub = dialogRef.componentInstance.onAddBlogCategory.subscribe((response)=>{
      this.dataTable();
     })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      data:values,
    };
    const dialogRef = this.dialog.open(BlogCategoryComponent,dialogConfig);
     this.router.events.subscribe(() => {
        dialogRef.close();
     })

     const sub = dialogRef.componentInstance.onEditBlogCategory.subscribe((response)=>{
      this.dataTable();
     })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `DELETE `+ values.name,
      confirmation:true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);

    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.stop();
      this.deleteBlogCategory(values.id);
      dialogRef.close();
    });
  }

  deleteBlogCategory(id:any){
    this.blogCategoryService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataTable();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    });
  }
}
