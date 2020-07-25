import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'text/plain',
	'Accept': 'text/plain'
  })
};


@Injectable({
  providedIn: 'root'
})


export class LoginServiceService {


  constructor(private http: HttpClient) {}
  getLoginURL(){//
    return this.http.get('http://localhost:8080/api/google', { responseType: 'text'});
  }
  
  
  postCode(code): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/google2', { title: code })

  }
}
