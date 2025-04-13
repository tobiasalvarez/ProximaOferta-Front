import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { Component } from '@angular/core';
import { SupermercadoListComponent } from './components/supermercado/supermercado-list/supermercado-list.component';
import { SupermercadoFormComponent } from './components/supermercado/supermercado-form/supermercado-form.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoFormComponent } from './components/produto/produto-form/produto-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children: [
        {path: "supermercado", component: SupermercadoListComponent},
        {path: "supermercado/new", component: SupermercadoFormComponent},
        {path: "supermercado/update/:id", component: SupermercadoFormComponent},

        {path: "produto", component: ProdutoListComponent},
        {path: "produto/new", component: ProdutoFormComponent},
        {path: "produto/update/:id", component: ProdutoFormComponent},

        {path: "usuario", component: UsuarioListComponent},
        {path: "usuario/new", component: UsuarioFormComponent},
        {path: "usuario/update/:id", component: UsuarioFormComponent},
    ]}
];
