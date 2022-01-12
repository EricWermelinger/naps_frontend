import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './config/appRoutes';
import { LoginSuccessComponent } from './pages/login-success/login-success.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: appRoutes.empty, redirectTo: appRoutes.login, pathMatch: 'full' },
  // todo: when logged in to initial
  { path: appRoutes.login, component: LoginComponent },
  {
    // todo: canActivate
    // todo: http header
    path: appRoutes.app,
    children: [
      { path: appRoutes.initialAfterLogin, component: LoginSuccessComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
