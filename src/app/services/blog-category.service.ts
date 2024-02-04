import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+"/blog-category/create", data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    });
  }

  getAllBlogCategory(){
    return this.httpClient.get(this.url+"/blog-category/all");
  }

  update(data:any){
    return this.httpClient.post(this.url+"/blog-category/update",data,{
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    });
  }

  delete(id:any){
    return this.httpClient.post(this.url+"/blog-category/delete/"+id,{
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }
}
