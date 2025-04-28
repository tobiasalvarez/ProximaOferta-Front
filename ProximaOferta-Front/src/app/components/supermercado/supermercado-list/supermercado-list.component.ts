import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Supermercado } from '../../../models/supermercado';
import { RouterLink } from '@angular/router';
import { SupermercadoService } from '../../../services/supermercado.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SupermercadoFormComponent } from "../supermercado-form/supermercado-form.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supermercado-list',
  standalone: true,
  imports: [MdbModalModule, SupermercadoFormComponent, FormsModule],
  templateUrl: './supermercado-list.component.html',
  styleUrl: './supermercado-list.component.scss'
})
export class SupermercadoListComponent {
  lista: Supermercado[]= [];
  emailBusqueda: string = '';
  supermercadoService = inject(SupermercadoService);
  @Input("botoes") botoes : boolean = false;  
  @Output("retornoSupermercado") retornoSupermercado = new EventEmitter<any>();
  supermercadoEdit: Supermercado = new Supermercado;

//ELEMENTOS DA MODAL
  modalService = inject(MdbModalService) // para conseguri abrir a modal
  @ViewChild ("modalSupermercadoDetalhe") modalSupermercadoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;


  constructor(){
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

  delete(supermercado: Supermercado){
    Swal.fire({
        title: 'Tem certeza que deseja deletar este registro?',
          icon: 'warning',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      let indice = this.lista.findIndex(x => {return x.id == supermercado.id});
      this.lista.splice(indice, 1)};
      Swal.fire({
        title: 'Deletado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  });
  }


  select(supermercado: Supermercado){
    this.retornoSupermercado.emit(supermercado);
  }
new(){
  this.supermercadoEdit = new Supermercado;
  this.modalRef = this.modalService.open(this.modalSupermercadoDetalhe);
}

edit(supermercado: Supermercado){
  this.supermercadoEdit = Object.assign({}, supermercado); // clonando para evitar referencia de objeto
  this.modalRef = this.modalService.open(this.modalSupermercadoDetalhe);
}

retornoDetalhe(supermercado: Supermercado){
  if(supermercado.id > 0){
    let indice = this.lista.findIndex(x => {return x.id == supermercado.id});
    this.lista[indice] = supermercado;
  }else{
    this.lista.push(supermercado)
  }

this.modalRef.close();
}

findByEmailContainingIgnoreCase(email: string){
  this.supermercadoService.findByEmailContainingIgnoreCase(email).subscribe({
    next: (data) => {
      this.lista = data;
    },
    error: (erro) => {
      Swal.fire(erro.error, '', 'error');
    }
  });
}



}