import { inject, Injectable } from '@angular/core';
import { Comprador } from '../models/comprador';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompradorServiceService {

  http = inject(HttpClient);
  API = 'http://localhost:8080/api/comprador';

  constructor() { }

  findAll():Observable<Comprador[]>{
    return this.http.get<Comprador[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Comprador> {
    return this.http.get<Comprador>(this.API + '/findById/' + id);
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, {responseType : 'text' as 'json'});
  }

  save(comprador : Comprador): Observable<string>{
    return this.http.post<string>(this.API + '/save', comprador, {responseType : 'text' as 'json'});
  }

  update(comprador : Comprador, id: number): Observable<string>{
    return this.http.put<string>(this.API+'/update/' + id, comprador, {responseType: 'text' as 'json'});
  }



}
