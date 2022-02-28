import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  public get(url) {
    return this.http.get<any>(`http://localhost:8080/${url}`)
  }

  public post(url, data) {
    let headers = {'content-type': 'application/json'};
    return this.http.post<any>(`http://localhost:8080/${url}`, data, {
      'headers': headers
    });
  }
}
