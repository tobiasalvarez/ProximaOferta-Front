import { inject, Injectable } from '@angular/core';
import { Comprador } from '../models/comprador';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pagina } from '../models/pagina';
@Injectable({
  providedIn: 'root'
})
export class CompradorService {

  http = inject(HttpClient);
  API = environment.SERVIDOR+'/api/comprador';

  
  findAll(numPaginaAtual: number): Observable<Pagina>{ return this.http.get<Pagina>(this.API+'/findAll/'+numPaginaAtual); }

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

 findByNomeContainingIgnoreCase(nome: string): Observable<Comprador[]>{
    return this.http.get<Comprador[]>(this.API + '/findByNomeContainingIgnoreCase', { params : {nome}});
  }

}
