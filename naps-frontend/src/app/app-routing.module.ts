import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSuccessComponent } from './pages/login-success/login-success.component';
import { LoginComponent } from './pages/login/login.component';
import { appRoutes } from './routes';

const routes: Routes = [
  { path: appRoutes.empty, redirectTo: 'login', pathMatch: 'full' },
  { path: appRoutes.login, component: LoginComponent },
  {
    // todo: canActivate
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
