import { Injectable, inject } from '@angular/core';
import { Supermercado } from '../models/supermercado';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SupermercadoService {

  
    http = inject(HttpClient);
    API = environment.SERVIDOR+'/api/supermercado';
  
    constructor() { }
  
    findAll():Observable<Supermercado[]>{
      return this.http.get<Supermercado[]>(this.API+'/findAll');
    }
  
    findById(id: number): Observable<Supermercado> {
      return this.http.get<Supermercado>(this.API + '/findById/' + id);
    }
  
    deleteById(id: number): Observable<string> {
      return this.http.delete<string>(this.API + '/deleteById/' + id, {responseType : 'text' as 'json'});
    }
  
    save(supermercado: Supermercado): Observable<string>{
      return this.http.post<string>(this.API + '/save', supermercado, {responseType : 'text' as 'json'});
    }
  
    update(supermercado :Supermercado, id: number): Observable<string>{
      return this.http.put<string>(this.API+'/update/' + id, supermercado, {responseType: 'text' as 'json'});
    }

    findByEmailContainingIgnoreCase(email: string): Observable<Supermercado[]> {
      return this.http.get<Supermercado[]>(this.API + '/findByEmailContainingIgnoreCase', { params : {email}})
    }

    findByUsuarioUsuarioContainingIgnoreCase(usuario: string): Observable<Supermercado[]>{
      return this.http.get<Supermercado[]>(this.API + '/findByUsuarioUsuarioContainingIgnoreCase', {params :{usuario}});
    }
  
  
}
