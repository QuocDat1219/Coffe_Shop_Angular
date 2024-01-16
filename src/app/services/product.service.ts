import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url + '/product/create',data,{
      headers: new HttpHeaders({'Content-Type':'application/json'}),
    })
  }

  update(data:any){
    return this.httpClient.post(this.url + '/product/update',data,{
      headers: new HttpHeaders({'Content-Type':'application/json'}),
    })
  }

  getProducts(){
    return this.httpClient.get(this.url + '/product/all');
  }

  updateStatus(data:any){
    return this.httpClient.post(this.url + '/product/update-status',data,{
      headers: new HttpHeaders({'Content-Type':'application/json'}),
    })
  }

  delete(id:any){
    return this.httpClient.post(this.url + '/product/delete/'+id,{
      headers: new HttpHeaders({'Content-Type':'application/json'}),
    })
  }

  getProductByCategory(id:any){
    return this.httpClient.get(this.url + '/product/get-by-category/'+id);
  }
  
  getById(id:any){
    return this.httpClient.get(this.url + '/product/get-product/'+id);
  }
}
