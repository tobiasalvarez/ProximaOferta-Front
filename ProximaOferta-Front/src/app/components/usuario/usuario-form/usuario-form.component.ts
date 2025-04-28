import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { SupermercadoListComponent } from "../../supermercado/supermercado-list/supermercado-list.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Supermercado } from '../../../models/supermercado';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, SupermercadoListComponent],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {
  lista: Usuario[] = [];
  usuarioService = inject(UsuarioService);

  @Input("usuario") usuario: Usuario = new Usuario();
  @Output("retorno") retorno = new EventEmitter();

// para conseguri abrir a modal
  modalService = inject(MdbModalService) 
  @ViewChild ("modalFindSupermercado") modalFindSupermercado!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  roteador = inject(Router);
  route = inject(ActivatedRoute);

  save(){
      if(this.usuario.id > 0){
        // UPDATE
        this.usuarioService.update(this.usuario, this.usuario.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.roteador.navigate(['admin/usuario']);
            this.retorno.emit("OK");
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
      }else{
        // SAVE
        this.usuarioService.save(this.usuario).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.roteador.navigate(['admin/usuario']);
            this.retorno.emit("OK");
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
  
      }
      
      this.retorno.emit(this.usuario);
    }

    findSupermercado(){
      this.modalRef = this.modalService.open(this.modalFindSupermercado, {modalClass: 'modal-lg'});
    }

    retornoSupermercado(supermercado: Supermercado){
      this.usuario.supermercado = supermercado;
      this.modalRef.close();
    }

}

