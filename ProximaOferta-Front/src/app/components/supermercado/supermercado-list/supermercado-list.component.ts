import { Component, inject, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Supermercado } from '../../../models/supermercado';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';

import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms';
import { SupermercadoService } from '../../../services/supermercado.service';
import { RouterLink } from '@angular/router';
import { SupermercadoFormComponent } from "../supermercado-form/supermercado-form.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-supermercado-list',
  standalone: true,
  imports: [FormsModule, RouterLink, SupermercadoFormComponent, MdbModalModule],
  templateUrl: './supermercado-list.component.html',
  styleUrl: './supermercado-list.component.scss'
})
export class SupermercadoListComponent {
  lista: Supermercado[] = [];
  supermercadoService = inject(SupermercadoService);

  modalService = inject(MdbModalService);
  @ViewChild("modalSupermercadoNew") modalSupermercadoNew!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;


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

  open(){
    this.modalRef = this.modalService.open(this.modalSupermercadoNew);
  }

  close(){
    this.modalRef.close();
  }
}
