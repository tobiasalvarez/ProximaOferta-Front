import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { UsuarioFormComponent } from "../usuario-form/usuario-form.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Pagina } from '../../../models/pagina';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [RouterLink, UsuarioFormComponent, MdbModalModule, NgbPaginationModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent {
  lista: Usuario[] = [];
    pagina: Pagina = new Pagina();
    numPaginaAtual: number = 4;
  usuarioService = inject(UsuarioService);

  modalService = inject(MdbModalService);
  @ViewChild("modalUsuarioNew") modalUsuarioNew!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
     /*this.findAll();*/
    }
  
 /*findAll() { 
 
   this.usuarioService.findAll(this.numPaginaAtual).subscribe({
      next: (pagina: Pagina) => {
        this.pagina = pagina;
        this.lista = pagina.content;
      }, 
      error: (erro) => { Swal.fire(erro.error, '', 'error'); } 
   }); 
 }*/

  delete(usuario: Usuario){
      Swal.fire({
          title: 'Tem certeza que deseja deletar este registro?',
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.lista.findIndex(x => {return x.id == usuario.id});
        this.lista.splice(indice, 1)};
        Swal.fire({
          title: 'Deletado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
      })
    });
    }

  open(){
    this.modalRef = this.modalService.open(this.modalUsuarioNew);
  }

  close(){
    this.modalRef.close();
  }

  /*trocarPagina(pagina: any){
  this.numPaginaAtual = pagina;
  this.findAll();
}*/
}
