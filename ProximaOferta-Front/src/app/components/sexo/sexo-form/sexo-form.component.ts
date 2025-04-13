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

  private sexoService = inject(SexoService);
  private roteador = inject(Router);
  private route = inject(ActivatedRoute);
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
    if(this.sexo.id> 0){
      Swal.fire({
        title: 'Editado com sucesso!',
        text: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    alert('Editado com sucesso!');
    this.router2.navigate(['admin/sexo'], {state: { compradorEditado: this.sexo}})
  }else{
    Swal.fire({
      title: 'Salvo com sucesso!',
      text: 'Salvo com sucesso',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    this.router2.navigate(['admin/sexo'], {state: { compradorNovo: this.sexo}})
  }
}
     
}