import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

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
  ) {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.email],
      password: ['']
    });
  }

  login() {
    const mail = this.loginForm.value.mail;
    const password = this.loginForm.value.password;

    this.auth.loginUser(mail, password);
  }
}
