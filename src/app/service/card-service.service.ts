import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Server } from 'http';


@Injectable({
  providedIn: 'root'
})
export class CardServiceService {


  constructor(private http: HttpClient) {} 
  API='http://localhost:8081';

  public getServiceCenter()
  {
    return this.http.get(this.API+'/service-centers/all');
  }

  ngOnInit(): void {
  }
}
