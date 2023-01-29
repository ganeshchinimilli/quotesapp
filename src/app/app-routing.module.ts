import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { AnonymusguardGuard } from './shared/anonymusguard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent ,canActivate:[AnonymusguardGuard]},
  { path: 'register', component: SignupComponent,canActivate:[AnonymusguardGuard] },
  { path: 'profile', component: HomeComponent , },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
