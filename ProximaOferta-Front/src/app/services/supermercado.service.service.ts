import { inject, Injectable } from '@angular/core';
import { Supermercado } from '../models/supermercado';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupermercadoServiceService {

  http = inject(HttpClient);
  API = 'http://localhost:8080/api/supermercado';

  constructor() { }

  findAll():Observable<Supermercado[]>{
    return this.http.get<Supermercado[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Supermercado> {
    return this.http.get<Supermercado>(this.API + '/findById/' + id);
  }

  



}
