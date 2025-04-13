import { inject, Injectable } from '@angular/core';
import { Sexo } from '../models/sexo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SexoService {

  http = inject(HttpClient);
  API = 'http://localhost:8080/api/sexo';

  constructor() { }

  findAll():Observable<Sexo[]>{
    return this.http.get<Sexo[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Sexo> {
    return this.http.get<Sexo>(this.API + '/findById/' + id);
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, {responseType : 'text' as 'json'});
  }

  save(sexo: Sexo): Observable<string>{
    return this.http.post<string>(this.API + '/save', sexo, {responseType : 'text' as 'json'});
  }

  update(sexo :Sexo, id: number): Observable<string>{
    return this.http.put<string>(this.API+'/update/' + id, sexo, {responseType: 'text' as 'json'});
  }



}
