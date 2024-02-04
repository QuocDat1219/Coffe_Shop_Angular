import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  url = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  add(data:any) {
    return this.httpClient.post(this.url+"/blog/create", data,{
      headers : new HttpHeaders({"Content-Type": "application/json"}),
    })
  }

  getAllBlog(){
    return this.httpClient.get(this.url+"/blog/all");
  }

  update(data:any){
    return this.httpClient.post(this.url+"/blog/update", data,{
      headers : new HttpHeaders({"Content-Type":"application/json"}),
    });
  }
}
