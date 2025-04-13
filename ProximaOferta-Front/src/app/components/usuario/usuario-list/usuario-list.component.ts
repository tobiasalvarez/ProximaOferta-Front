import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { UsuarioFormComponent } from "../usuario-form/usuario-form.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [RouterLink, UsuarioFormComponent, MdbModalModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent {
  lista: Usuario[] = [];
  usuarioService = inject(UsuarioService);

  modalService = inject(MdbModalService);
  @ViewChild("modalUsuarioNew") modalUsuarioNew!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
     this.findAll();
    }
  
  findAll(){
     
    this.usuarioService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  open(){
    this.modalRef = this.modalService.open(this.modalUsuarioNew);
  }

  close(){
    this.modalRef.close();
  }
}
