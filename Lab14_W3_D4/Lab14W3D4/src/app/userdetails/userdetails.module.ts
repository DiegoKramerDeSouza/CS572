import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdetailsComponent } from './userdetails.component';
import { MyCanActivateGuard } from '../my-can-activate.guard';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ 
    UserdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: UserdetailsComponent, canActivate: [MyCanActivateGuard]}
    ])
  ],
  providers: [MyCanActivateGuard],
  bootstrap: [UserdetailsComponent]
})
export class UserdetailsModule { }
