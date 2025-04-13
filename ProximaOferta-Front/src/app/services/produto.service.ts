<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

=======
import { inject, Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
>>>>>>> 284495d27d4cd00fe45be2ff366ff0a1a573f7d7
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/produto';

  http = inject(HttpClient);
  API = 'http://localhost:8080/api/produto';

  constructor() { }

<<<<<<< HEAD
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
=======
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



>>>>>>> 284495d27d4cd00fe45be2ff366ff0a1a573f7d7
}
