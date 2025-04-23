import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Comprador } from '../../../models/comprador';
import { RouterLink } from '@angular/router';
import { CompradorService } from '../../../services/comprador.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CompradorFormComponent } from "../comprador-form/comprador-form.component";

@Component({
  selector: 'app-comprador-list',
  standalone: true,
  imports: [MdbModalModule, CompradorFormComponent],
  templateUrl: './comprador-list.component.html',
  styleUrl: './comprador-list.component.scss'
})
export class CompradorListComponent {
  lista: Comprador[]= [];
  compradorService = inject(CompradorService);
  @Input("botoes") botoes : boolean = false;  
  @Output("retornoComprador") retornoComprador = new EventEmitter<any>();
  compradorEdit: Comprador = new Comprador();

//ELEMENTOS DA MODAL
  modalService = inject(MdbModalService) // para conseguri abrir a modal
  @ViewChild ("modalCompradorDetalhe") modalCompradorDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor(){
    this.findAll();

  }


  findAll(){
    
    this.compradorService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  delete(comprador: Comprador){
    Swal.fire({
        title: 'Tem certeza que deseja deletar este registro!',
          icon: 'warning',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      let indice = this.lista.findIndex(x => {return x.id == comprador.id});
      this.lista.splice(indice, 1)};
      Swal.fire({
        title: 'Deletado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  });
  }


  select(comprador:Comprador){
    this.retornoComprador.emit(comprador);
  }
new(){
  this.compradorEdit = new Comprador();
  this.modalRef = this.modalService.open(this.modalCompradorDetalhe);
}

edit(comprador:Comprador){
  this.compradorEdit = Object.assign({}, comprador); // clonando para evitar referencia de objeto
  this.modalRef = this.modalService.open(this.modalCompradorDetalhe);
}

retornoDetalhe(comprador: Comprador){
  if(comprador.id > 0){
    let indice = this.lista.findIndex(x => {return x.id == comprador.id});
    this.lista[indice] = comprador;
  }else{
    this.lista.push(comprador)
  }




this.modalRef.close();
}

}