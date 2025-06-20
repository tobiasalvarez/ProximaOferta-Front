import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Produto } from '../../../models/produto';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutoFormComponent } from "../produto-form/produto-form.component";
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../auth/login.service';
import { Pagina } from '../../../models/pagina';  
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [MdbModalModule, ProdutoFormComponent, FormsModule, NgbPaginationModule, RouterLink],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.scss'
})
export class ProdutoListComponent {
  lista: Produto[]= [];
  nomeProcurado: string = '';
    pagina: Pagina = new Pagina();
    numPaginaAtual: number = 2;
  produtoService = inject(ProdutoService);
  @Input("botoes") botoes : boolean = false;  
  @Output("retornoProduto") retornoProduto = new EventEmitter<any>();
  produtoEdit: Produto = new Produto();

//ELEMENTOS DA MODAL
  modalService = inject(MdbModalService) // para conseguri abrir a modal
  @ViewChild ("modalProdutoDetalhe") modalProdutoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor(){
    this.findAll();
  }

  loginService = inject(LoginService);

findAll() { 

  this.produtoService.findAll(this.numPaginaAtual).subscribe({
     next: (pagina: Pagina) => {
       this.pagina = pagina;
       this.lista = pagina.content;
     }, 
     error: (erro) => { Swal.fire(erro.error, '', 'error'); } 
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
  this.produtoEdit = new Produto();
  this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
}

edit(produto: Produto){
  this.produtoEdit = Object.assign({}, produto); // clonando para evitar referencia de objeto
  this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
}

retornoDetalhe(produto: Produto){
  if(produto.id > 0){
    let indice = this.lista.findIndex(x => x.id == produto.id);
    this.lista[indice] = produto;
  } else {
    this.lista.push(produto); // agora o produto tem id real
  }

  this.modalRef.close();
}

findByNomeContainingIgnoreCase(nome: string){
  this.produtoService.findByNomeContainingIgnoreCase(nome).subscribe({
    next: (data) => {
      this.lista = data;
    },
    error: (erro) => {
      Swal.fire(erro.error, '', 'error');
    }

  });
  
  }

  trocarPagina(pagina: any){
    this.numPaginaAtual = pagina;
    this.findAll();
  }

}