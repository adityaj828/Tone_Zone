import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';
import { SingleServiceComponent } from './single-service/single-service.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'single-service', component: SingleServiceComponent },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SingleServiceComponent],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    DataTablesModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})

export class UserModule { }
