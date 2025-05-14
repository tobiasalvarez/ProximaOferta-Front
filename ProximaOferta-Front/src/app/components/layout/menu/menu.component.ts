import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule, RouterModule, RouterOutlet,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

    loginService = inject(LoginService);
    
}
