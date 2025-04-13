import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario: Usuario = new Usuario();

  router = inject(Router);

  logar(){
    if (this.usuario.usuario == "admin" && this.usuario.senha == "admin") {
      this.router.navigate(['admin/supermercado'])
    } else {
      alert('Tente novamente!');
    }
  }
}
