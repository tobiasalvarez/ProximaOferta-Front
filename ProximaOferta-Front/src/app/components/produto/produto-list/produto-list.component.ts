import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProdutoFormComponent } from "../produto-form/produto-form.component";

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [RouterLink, MdbModalModule, ProdutoFormComponent],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.scss'
})
export class ProdutoListComponent {
  lista: Produto[] = [];
  produtoService = inject(ProdutoService);

  modalService = inject(MdbModalService);
  @ViewChild("modalProdutoNew") modalProdutoNew!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
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
  
  new(){
    this.modalRef = this.modalService.open(this.modalProdutoNew);
  } 
  close(){
    this.modalRef.close();
  }
}
