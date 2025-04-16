
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);
  API = 'http://localhost:8080/api/usuario';

  constructor() { }

  findAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.API + '/findById/' + id);
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, {responseType : 'text' as 'json'});
  }

  save(usuario: Usuario): Observable<string>{
    return this.http.post<string>(this.API + '/save', usuario, {responseType : 'text' as 'json'});
  }

  update(usuario :Usuario, id: number): Observable<string>{
    return this.http.put<string>(this.API+'/update/' + id, usuario, {responseType: 'text' as 'json'});
  }
}
