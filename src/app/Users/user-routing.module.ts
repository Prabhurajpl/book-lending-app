import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: '/register', pathMatch: 'full'},
  {path:'register',component:UserRegistrationComponent},
  {path:'login',component:UserLoginComponent},
  {path:'verify-email',component:VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
