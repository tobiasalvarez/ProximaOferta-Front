import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { Comprador } from '../../../models/comprador';
import { RouterLink } from '@angular/router';
import { CompradorService } from '../../../services/comprador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprador-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './comprador-list.component.html',
  styleUrl: './comprador-list.component.scss'
})
export class CompradorListComponent {
  lista: Comprador[]= [];
  compradorService = inject(CompradorService);
  @Input("botoes") botoes : boolean = false;  
  @Output("retornoComprador") retornoComprador = new EventEmitter<any>();

  constructor(){
    
    

    let compradorNovo = history.state.compradorNovo;
    let compradorEditado = history.state.compradorEditado;
    
    if(compradorNovo){
      compradorNovo.id = 0;
      this.lista.push(compradorNovo);
    }
  
    if(compradorEditado){
      let i = this.lista.findIndex(x => {return x.id == compradorEditado.id});
      this.lista = compradorEditado
    }

  }


  findAll(){
    
    this.compradorService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  delete(comprador: Comprador){
    Swal.fire({
          title: 'Tem certeza que deseja deletar este registro!',
          icon: 'warning',
          showConfirmButton: true,
          confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      let indice = this.lista.findIndex(x => {return x.id == comprador.id});
      this.lista.splice(indice, 1);}

      Swal.fire({
        title: 'Deletado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  });


   if (confirm("Tem certeza que quer deletar este registro?") ){
    let i = this.lista.findIndex(x => {return x.id == comprador.id});
    this.lista.splice(i, 1);
  }}

  select(comprador:Comprador){
    this.retornoComprador.emit(comprador);
  }
}