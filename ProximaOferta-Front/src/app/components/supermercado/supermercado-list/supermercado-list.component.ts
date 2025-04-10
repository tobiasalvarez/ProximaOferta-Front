import { Component } from '@angular/core';
import { Supermercado } from '../../../models/supermercado';
import { Usuario } from '../../../models/usuario';


@Component({
  selector: 'app-supermercado-list',
  standalone: true,
  imports: [],
  templateUrl: './supermercado-list.component.html',
  styleUrl: './supermercado-list.component.scss'
})
export class SupermercadoListComponent {
  lista: Supermercado[] = [];

  constructor() {
    this.lista = [
      { id: 1, nome: 'Supermercado A', rua: 'Calle 123', email: 'abc@gmail.com', cadastroCompleto: true , usuario: new Usuario{id: 1, usuario: 'admin', senha: 'admin'}}, 
      { id: 2, nome: 'Supermercado B', rua: 'Calle 456', email: 'abcd@gmail.com', latitud: 10.654321, longitud: -74.654321 },
      { id: 3, nome: 'Supermercado C', rua: 'Calle 789', email: 'abcd@gmail.com', latitud: 10.789012, longitud: -74.789012 }
    ];
  }


}
