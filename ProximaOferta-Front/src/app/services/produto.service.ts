
import { inject, Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  http = inject(HttpClient);
  API = environment.SERVIDOR+'/api/produto';

  constructor() { }

  findAll():Observable<Produto[]>{
    return this.http.get<Produto[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.API + '/findById/' + id);
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, {responseType : 'text' as 'json'});
  }

  save(produto: Produto): Observable<string>{
    return this.http.post<string>(this.API + '/save', produto, {responseType : 'text' as 'json'});
  }

  update(produto :Produto, id: number): Observable<string>{
    return this.http.put<string>(this.API+'/update/' + id, produto, {responseType: 'text' as 'json'});
  }


   findByNomeContainingIgnoreCase(nome: string): Observable<Produto[]>{

      return this.http.get<Produto[]>(this.API + '/findByProdutoContainingIgnoreCase', { params : {nome}});
    }

}
