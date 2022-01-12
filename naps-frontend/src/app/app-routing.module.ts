import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './auth/guards/app.guard';
import { appRoutes } from './config/appRoutes';
import { LoginSuccessComponent } from './pages/login-success/login-success.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: appRoutes.empty, redirectTo: appRoutes.login, pathMatch: 'full' },
  // todo: when logged in, redirect to initialAfterLogin
  { path: appRoutes.login, component: LoginComponent },
  {
    path: appRoutes.app,
    canActivate: [AppGuard],
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
