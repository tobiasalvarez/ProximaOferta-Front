import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Produto } from '../../../models/produto';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutoFormComponent } from "../produto-form/produto-form.component";

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [MdbModalModule, ProdutoFormComponent],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.scss'
})
export class ProdutoListComponent {
  lista: Produto[]= [];
  produtoService = inject(ProdutoService);
  @Input("botoes") botoes : boolean = false;  
  @Output("retornoProduto") retornoProduto = new EventEmitter<any>();
  produtoEdit: Produto = new Produto(0,"",new Date, 0, );

//ELEMENTOS DA MODAL
  modalService = inject(MdbModalService) // para conseguri abrir a modal
  @ViewChild ("modalProdutoDetalhe") modalProdutoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor(){
    this.findAll();
  }


  findAll(){
    
    this.produtoService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  delete(produto: Produto){
    Swal.fire({
        title: 'Tem certeza que deseja deletar este registro?',
          icon: 'warning',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      let indice = this.lista.findIndex(x => {return x.id == produto.id});
      this.lista.splice(indice, 1)};
      Swal.fire({
        title: 'Deletado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  });
  }


  select(produto: Produto){
    this.retornoProduto.emit(produto);
  }
new(){
  this.produtoEdit = new Produto(0,"",new Date(), 0);
  this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
}

edit(produto: Produto){
  this.produtoEdit = Object.assign({}, produto); // clonando para evitar referencia de objeto
  this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
}

retornoDetalhe(produto: Produto){
  if(produto.id > 0){
    let indice = this.lista.findIndex(x => {return x.id == produto.id});
    this.lista[indice] = produto;
  }else{
    produto.id = 55;
    this.lista.push(produto)
  }




this.modalRef.close();
}

}