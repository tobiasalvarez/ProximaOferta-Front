import { inject, Injectable } from '@angular/core';
import { Comanda } from '../models/comanda';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  http = inject(HttpClient);
  API = environment.SERVIDOR+'/api/comanda';

  constructor() { }

  findAll():Observable<Comanda[]>{
    return this.http.get<Comanda[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Comanda> {
    return this.http.get<Comanda>(this.API + '/findById/' + id);
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/deleteById/' + id, {responseType : 'text' as 'json'});
  }

  save(comanda : Comanda): Observable<string>{
    return this.http.post<string>(this.API + '/save', comanda, {responseType : 'text' as 'json'});
  }

  update(comanda : Comanda, id: number): Observable<string>{
    return this.http.put<string>(this.API+'/update/' + id, Comanda, {responseType: 'text' as 'json'});
  }



}
