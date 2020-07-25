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
export class TimHortonsSaugeenMaitlandService {

  constructor(private http: HttpClient) {}
  getItems(restaurant): Observable<any>{
    return this.http.post<any>('http://localhost:8080/api/getItems',{ title: restaurant });
  }
}
