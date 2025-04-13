import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Comprador } from '../../../models/comprador';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompradorService } from '../../../services/comprador.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-comprador-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './comprador-form.component.html',
  styleUrl: './comprador-form.component.scss'
})
export class CompradorFormComponent {

  

  @Input("comprador") comprador: Comprador = new Comprador(0, '', '', '', 0);
  @Output("meuEvento") meuEvento = new EventEmitter();

  private compradorService = inject(CompradorService);
  private roteador = inject(Router);
  private route = inject(ActivatedRoute);
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
    if(this.comprador.id> 0){
      Swal.fire({
        title: 'Editado com sucesso!',
        text: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    alert('Editado com sucesso!');
    this.router2.navigate(['admin/comprador'], {state: { compradorEditado: this.comprador}})
  }else{
    Swal.fire({
      title: 'Salvo com sucesso!',
      text: 'Salvo com sucesso',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    this.router2.navigate(['admin/comprador'], {state: { compradorNovo: this.comprador}})
  }
}
     
}