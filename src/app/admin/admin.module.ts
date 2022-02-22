import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserViewComponent } from './user-view/user-view.component';

import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'users', component: UserViewComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserViewComponent],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    DataTablesModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})

export class AdminModule { }
