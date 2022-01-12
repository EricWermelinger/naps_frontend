import { Component } from '@angular/core';
import { NapsApiService } from 'src/app/api/naps-api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { endpoints } from 'src/app/config/endpoints';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent {

  pingResult: string = 'not executed yet';

  constructor(
    private auth: AuthService,
    private api: NapsApiService,
  ) { }

  logout() {
    this.auth.logoutUser();
  }

  ping() {
    this.api.get(endpoints.ping, {}).subscribe(pong => {
      this.pingResult = pong?.message;
    });
  }
}
