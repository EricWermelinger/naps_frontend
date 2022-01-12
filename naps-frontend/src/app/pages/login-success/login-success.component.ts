import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent {

  constructor(
    private auth: AuthService,
  ) { }

  logout() {
    this.auth.logoutUser();
  }
}
