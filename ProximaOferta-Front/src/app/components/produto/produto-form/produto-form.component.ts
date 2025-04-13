import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent {
  @Input("produto") produto: Produto = new Produto();
  @Output("retorno") retorno = new EventEmitter();

  produtoService = inject(ProdutoService);
  roteador = inject(Router);
  route = inject(ActivatedRoute);

  save(){
    if(this.produto.id > 0){
      // UPDATE
      this.produtoService.update(this.produto, this.produto.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/professor']);
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
}
