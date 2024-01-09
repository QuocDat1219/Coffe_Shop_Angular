import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getDetail(){
    return this.httpClient.get(this.url+"/dashboard/details");
  }
}
