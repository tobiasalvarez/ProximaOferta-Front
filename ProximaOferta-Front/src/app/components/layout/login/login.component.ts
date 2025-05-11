import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { Router} from '@angular/router';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario: Usuario = new Usuario();

  loginService = inject(LoginService);
  router = inject(Router);

  logar(){
    this.loginService.logar(this.usuario).subscribe({
      next: token => {
        if(token){
          this.loginService.addToken(token);
        }else{
          alert('Usuario ou senha incorretos!!');
        }
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    });
  }







}
