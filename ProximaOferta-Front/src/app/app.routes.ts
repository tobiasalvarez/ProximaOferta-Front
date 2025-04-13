import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { Component } from '@angular/core';
import { SupermercadoListComponent } from './components/supermercado/supermercado-list/supermercado-list.component';
import { SupermercadoFormComponent } from './components/supermercado/supermercado-form/supermercado-form.component';
import { CompradorListComponent } from './components/comprador/comprador-list/comprador-list.component';
import { CompradorFormComponent } from './components/comprador/comprador-form/comprador-form.component';
import { SexoListComponent } from './components/sexo/sexo-list/sexo-list.component';
import { SexoFormComponent } from './components/sexo/sexo-form/sexo-form.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: PrincipalComponent, children: [
        {path: 'supermercado', component: SupermercadoListComponent},
        {path: 'supermercado/new', component: SupermercadoFormComponent},
        {path: 'supermercado/update/:id', component: SupermercadoFormComponent},
        {path: 'comprador', component: CompradorListComponent},
        {path: 'comprador/new', component: CompradorFormComponent},
        {path: 'comprador/update/:id', component: CompradorFormComponent},
        {path: 'sexo', component: SexoListComponent},
        {path: 'sexo/new', component: SexoFormComponent},
        {path: 'sexo/update/:id', component: SexoFormComponent}
    ]},
    
];
