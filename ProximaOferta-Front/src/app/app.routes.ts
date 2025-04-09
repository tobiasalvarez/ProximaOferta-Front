import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { Component } from '@angular/core';
import { SupermercadoListComponent } from './components/supermercado/supermercado-list/supermercado-list.component';
import { SupermercadoFormComponent } from './components/supermercado/supermercado-form/supermercado-form.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: PrincipalComponent, children: [
        {path: 'supermercado', component: SupermercadoListComponent},
        {path: 'supermercado/new', component: SupermercadoFormComponent},
        {path: 'supermercado/update/:id', component: SupermercadoFormComponent}
    ]}
];
