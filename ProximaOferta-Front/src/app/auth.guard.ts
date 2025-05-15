import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './auth/login.service';

export const guardGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let roteador = inject(Router);

  const routesADMIN = [
    '/admin/supermercado/new',
    '/admin/supermercado/update/:id',
    '/admin/produto/new',
    '/admin/produto/update/:id',
    '/admin/usuario/new',
    '/admin/usuario/update/:id',
    '/admin/sexo',
    '/admin/sexo/new',
    '/admin/sexo/update/:id',
    '/admin/comprador',
    '/admin/comprador/new',
    '/admin/comprador/update/:id',
  ];

  if (routesADMIN.includes(state.url) && !loginService.hasRole('ADMIN')) {
    window.alert('vc não tem permissão pra isso aqui');
    roteador.navigate(['/admin/produto']);
    return false;
  }

  return true;
};