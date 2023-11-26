import { NgModule } from '@angular/core';
import { RouterModule, Routes,ExtraOptions } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopUpComponent } from './pages/dashboard/top-up/top-up.component';
import { TransferComponent } from './pages/dashboard/transfer/transfer.component';
import { UserProfileComponent } from './pages/profile/user-profile/user-profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'top-up', component: TopUpComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'reset-password', component: ChangePasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];

const routerOptions: ExtraOptions = {
  useHash: true,
};


@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }