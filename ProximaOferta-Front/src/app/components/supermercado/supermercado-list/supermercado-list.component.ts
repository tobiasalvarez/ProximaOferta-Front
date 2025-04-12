import { Component, inject } from '@angular/core';
import { Supermercado } from '../../../models/supermercado';
import { Usuario } from '../../../models/usuario';
import { SupermercadoServiceService } from '../../../services/supermercado.service.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supermercado-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './supermercado-list.component.html',
  styleUrl: './supermercado-list.component.scss'
})
export class SupermercadoListComponent {
  lista: Supermercado[] = [];
  supermercadoService = inject(SupermercadoServiceService);

  constructor() {
   this.findAll();
  }

  findAll(){
   
    this.supermercadoService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  
  }
}
