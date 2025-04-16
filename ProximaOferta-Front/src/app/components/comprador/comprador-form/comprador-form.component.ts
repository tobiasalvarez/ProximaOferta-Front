import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Comprador } from '../../../models/comprador';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompradorService } from '../../../services/comprador.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { find } from 'rxjs';
import { CompradorListComponent } from '../comprador-list/comprador-list.component';


@Component({
  selector: 'app-comprador-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './comprador-form.component.html',
  styleUrl: './comprador-form.component.scss'
})
export class CompradorFormComponent {

  @Input("comprador") comprador: Comprador = new Comprador(0, '', '', '', 0);
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);


   compradorService = inject(CompradorService);
   roteador = inject(Router);
   route = inject(ActivatedRoute);
   router2 = inject(Router);

  findById(id: number) {
    this.compradorService.findById(id).subscribe({
      next: (compradorRetornado) => {
        this.comprador = compradorRetornado;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  save(){
        if(this.comprador.id > 0){
          // UPDATE
          this.compradorService.update(this.comprador, this.comprador.id).subscribe({
            next: (mensagem) => {
              Swal.fire(mensagem, '', 'success');
              this.roteador.navigate(['admin/comprador']);
              this.retorno.emit("OK");
            },
            error: (erro) => {
              Swal.fire(erro.error, '', 'error');
            }
          });
        }else{
          // SAVE
          this.compradorService.save(this.comprador).subscribe({
            next: (mensagem) => {
              Swal.fire(mensagem, '', 'success');
              this.roteador.navigate(['admin/comprador']);
              this.retorno.emit("OK");
            },
            error: (erro) => {
              Swal.fire(erro.error, '', 'error');
            }
          });
    
        }
        
        this.retorno.emit(this.comprador);
      }
     
}