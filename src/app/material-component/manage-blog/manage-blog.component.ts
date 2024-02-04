import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogServiceService } from 'src/app/services/blog-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { error, log } from 'console';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { BlogComponent } from '../dialog/blog/blog.component';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {

  displayedColumns: string[] = ["title","blogCategory","created_at","image","description","status","edit"];
  dataSource:any;
  responseMessage:any;

  constructor(
    private blogService:BlogServiceService,
    private ngxService:NgxUiLoaderService,
    public dialog:MatDialog,
    private router:Router,
    private snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.dataTable();
  }

  dataTable(){
    this.blogService.getAllBlog().subscribe((response:any)=>{
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
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
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
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(BlogComponent,dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddBlog.subscribe((response)=>{
      this.dataTable();
    })
  }

  handleDeleteAction(id:any){

  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add",
      data: values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(BlogComponent,dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onUpdateBlog.subscribe((response)=>{
      this.dataTable();
    })
  }
}
