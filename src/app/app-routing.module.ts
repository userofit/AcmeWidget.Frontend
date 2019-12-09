import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list/user-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'Signup', pathMatch: 'full'},
  { path: 'Signup', component: SignupComponent },
  { path: 'UserList', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
