<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
=======
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

>>>>>>> 284495d27d4cd00fe45be2ff366ff0a1a573f7d7
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/usuario';

  constructor() { }
<<<<<<< HEAD
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
=======

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



>>>>>>> 284495d27d4cd00fe45be2ff366ff0a1a573f7d7
}
