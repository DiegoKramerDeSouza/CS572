import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ErrComponent} from './err/err.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', loadChildren: './users/users.module#UsersModule'},
  {path: 'user/:uuid', loadChildren: './userdetails/userdetails.module#UserdetailsModule'},
  {path: 'err', component: ErrComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
