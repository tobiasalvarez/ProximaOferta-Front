import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Sexo } from '../../../models/sexo';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SexoService } from '../../../services/sexo.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sexo-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './sexo-form.component.html',
  styleUrl: './sexo-form.component.scss'
})

export class SexoFormComponent {

  @Input("sexo") sexo: Sexo = new Sexo();
  @Output("meuEvento") meuEvento = new EventEmitter();

  sexoService = inject(SexoService);
  roteador = inject(Router);
  route = inject(ActivatedRoute);
   router2 = inject(Router);

  findById(id: number) {
    this.sexoService.findById(id).subscribe({
      next: (sexoRetornado) => {
        this.sexo = sexoRetornado;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  save(){
        if(this.sexo.id > 0){
          // UPDATE
          this.sexoService.update(this.sexo, this.sexo.id).subscribe({
            next: (mensagem) => {
              Swal.fire(mensagem, '', 'success');
              this.roteador.navigate(['admin/sexo']);
              this.meuEvento.emit("OK");
            },
            error: (erro) => {
              Swal.fire(erro.error, '', 'error');
            }
          });
        }else{
          // SAVE
          this.sexoService.save(this.sexo).subscribe({
            next: (mensagem) => {
              Swal.fire(mensagem, '', 'success');
              this.roteador.navigate(['admin/sexo']);
              this.meuEvento.emit("OK");
            },
            error: (erro) => {
              Swal.fire(erro.error, '', 'error');
            }
          });
    
        }
        
        this.meuEvento.emit(this.sexo);
      }
     
}