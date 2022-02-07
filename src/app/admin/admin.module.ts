import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserViewComponent } from './user-view/user-view.component';


const routes: Routes = [
  { path: 'users', component: UserViewComponent }
]

@NgModule({
  declarations: [UserViewComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    
  ]
})
export class AdminModule { }
