import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'user-edit', component: UserEditComponent }
]

@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes),
    
  ]
})

export class AdminModule { }
