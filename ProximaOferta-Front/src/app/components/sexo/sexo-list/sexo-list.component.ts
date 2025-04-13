import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { Sexo } from '../../../models/sexo';
import { RouterLink } from '@angular/router';
import { SexoService } from '../../../services/sexo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sexo-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sexo-list.component.html',
  styleUrl: './sexo-list.component.scss'
})
export class SexoListComponent {
  lista: Sexo[]= [];
  sexoService = inject(SexoService);
  @Input("botoes") botoes : boolean = false;  
  @Output("retornoSexo") retornoComprador = new EventEmitter<any>();

  constructor(){
    
    

    let sexoNovo = history.state.sexoNovo;
    let sexoEditado = history.state.sexoEditado;
    
    if(sexoNovo){
      sexoNovo.id = 0;
      this.lista.push(sexoNovo);
    }
  
    if(sexoEditado){
      let i = this.lista.findIndex(x => {return x.id == sexoEditado.id});
      this.lista = sexoEditado
    }

  }


  findAll(){
    
    this.sexoService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  delete(sexo: Sexo){
    Swal.fire({
          title: 'Tem certeza que deseja deletar este registro!',
          icon: 'warning',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      let indice = this.lista.findIndex(x => {return x.id == sexo.id});
      this.lista.splice(indice, 1);}

      Swal.fire({
        title: 'Deletado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  });


   if (confirm("Tem certeza que quer deletar este registro?") ){
    let i = this.lista.findIndex(x => {return x.id == sexo.id});
    this.lista.splice(i, 1);
  }}

  select(sexo: Sexo){
    this.retornoComprador.emit(sexo);
  }
}