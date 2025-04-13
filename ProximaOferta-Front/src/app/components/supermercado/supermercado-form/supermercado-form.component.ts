import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Supermercado } from '../../../models/supermercado';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SupermercadoService } from '../../../services/supermercado.service';

@Component({
  selector: 'app-supermercado-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './supermercado-form.component.html',
  styleUrl: './supermercado-form.component.scss'
})
export class SupermercadoFormComponent {
  @Input("supermercado") supermercado: Supermercado = new Supermercado();
  @Output("retorno") retorno = new EventEmitter();

  supermercadoService = inject(SupermercadoService);
  roteador = inject(Router);
  route = inject(ActivatedRoute);
  
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
