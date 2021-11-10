import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'**'
    })
  }

  constructor( private http: HttpClient) { }

  apiURL='https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCwYek7uo-LI6LT9qYWLpfnpELnAXrPPLY&address=';

  getDireccion(direccion:string): Observable<any>{
    return this.http.get(this.apiURL+direccion).pipe(retry(3));
  }
}
