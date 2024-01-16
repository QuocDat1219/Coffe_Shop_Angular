import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url + '/category/create',data,{
      headers: new HttpHeaders({'Content-Type':'application/json'}),
    })
  }

  update(data:any){
    return this.httpClient.post(this.url + '/category/update',data,{
      headers: new HttpHeaders({'Content-Type':'application/json'}),
    })
  }

  getCategories(){
    return this.httpClient.get(this.url + '/category/all');
  }

  getFillteredCategory(){
    return this.httpClient.get(this.url + '/category/all?filterValue=true');
  }
}
