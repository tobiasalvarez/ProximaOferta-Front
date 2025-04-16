import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Supermercado } from '../../../models/supermercado';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupermercadoService } from '../../../services/supermercado.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { find } from 'rxjs';
import { SupermercadoListComponent } from '../supermercado-list/supermercado-list.component';


@Component({
  selector: 'app-supermercado-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './supermercado-form.component.html',
  styleUrl: './supermercado-form.component.scss'
})
export class SupermercadoFormComponent {

  @Input("supermercado") supermercado: Supermercado = new Supermercado(0, '', '', '');
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);


   supermercadoService = inject(SupermercadoService);
  roteador = inject(Router);
   route = inject(ActivatedRoute);
   router2 = inject(Router);

  findById(id: number) {
      this.supermercadoService.findById(id).subscribe({
        next: (supermercadoRetornado) => {
          this.supermercado = supermercadoRetornado;
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    }

  save(){
        if(this.supermercado.id > 0){
          // UPDATE
          this.supermercadoService.update(this.supermercado, this.supermercado.id).subscribe({
            next: (mensagem) => {
              Swal.fire(mensagem, '', 'success');
              this.roteador.navigate(['admin/supermercado']);
              this.retorno.emit("OK");
            },
            error: (erro) => {
              Swal.fire(erro.error, '', 'error');
            }
          });
        }else{
          // SAVE
          this.supermercadoService.save(this.supermercado).subscribe({
            next: (mensagem) => {
              Swal.fire(mensagem, '', 'success');
              this.roteador.navigate(['admin/supermercado']);
              this.retorno.emit("OK");
            },
            error: (erro) => {
              Swal.fire(erro.error, '', 'error');
            }
          });
    
        }
        
        this.retorno.emit(this.supermercado);
      }
}