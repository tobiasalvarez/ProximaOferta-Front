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
import { Sexo } from '../../../models/sexo';
import { SexoListComponent } from "../../sexo/sexo-list/sexo-list.component";


@Component({
  selector: 'app-comprador-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, SexoListComponent],
  templateUrl: './comprador-form.component.html',
  styleUrl: './comprador-form.component.scss'
})
export class CompradorFormComponent {

  @Input("comprador") comprador: Comprador = new Comprador();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);

  // para conseguri abrir a modal
  modalService = inject(MdbModalService) 
  @ViewChild ("modalFindGenero") modalFindGenero!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;


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

      findGenero(){
        this.modalRef = this.modalService.open(this.modalFindGenero);
      }

      retornoGenero(genero:Sexo){
              this.comprador.genero = genero;
              this.modalRef.close();
      }
     
}