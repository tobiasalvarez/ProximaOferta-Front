import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Produto } from '../../../models/produto';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { find } from 'rxjs';
import { ProdutoListComponent } from '../produto-list/produto-list.component';
import { SupermercadoListComponent } from "../../supermercado/supermercado-list/supermercado-list.component";
import { Supermercado } from '../../../models/supermercado';


@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, SupermercadoListComponent],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent {

  @Input("produto") produto: Produto = new Produto();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);

  modalService = inject(MdbModalService) // para conseguri abrir a modal
  @ViewChild ("modalFindSupermercado") modalFindSupermercado!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

   produtoService = inject(ProdutoService);
  roteador = inject(Router);
  route = inject(ActivatedRoute);
   router2 = inject(Router);

  findById(id: number) {
    this.produtoService.findById(id).subscribe({
      next: (produtoRetornado) => {
        this.produto = produtoRetornado;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  save(){
          if(this.produto.id > 0){
            // UPDATE
            this.produtoService.update(this.produto, this.produto.id).subscribe({
              next: (mensagem) => {
                Swal.fire(mensagem, '', 'success');
                this.roteador.navigate(['admin/produto']);
                this.retorno.emit("OK");
              },
              error: (erro) => {
                Swal.fire(erro.error, '', 'error');
              }
            });
          }else{
            // SAVE
            this.produtoService.save(this.produto).subscribe({
              next: (mensagem) => {
                Swal.fire(mensagem, '', 'success');
                this.roteador.navigate(['admin/produto']);
                this.retorno.emit("OK");
              },
              error: (erro) => {
                Swal.fire(erro.error, '', 'error');
              }
            });
      
          }
          
          this.retorno.emit(this.produto);
        }

      findSupermercado(){
        this.modalRef = this.modalService.open(this.modalFindSupermercado, {modalClass: 'modal-lg'}); 
      }

      retornoSupermercado(supermercado:Supermercado){
        this.produto.supermercado = supermercado;
        this.modalRef.close();
      }
     
}