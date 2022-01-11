import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { appRoutes } from 'src/app/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.email],
      password: ['']
    });
  }

  login() {
    const mail = this.loginForm.value.mail;
    const password = this.loginForm.value.password;

    this.auth.loginUser(mail, password).subscribe(_ => {
      this.router.navigate([appRoutes.app, appRoutes.initialAfterLogin]);
    });
  }
}
