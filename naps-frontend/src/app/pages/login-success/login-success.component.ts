import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { NapsApiService } from 'src/app/api/naps-api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { endpoints } from 'src/app/config/endpoints';
import { DropdownConfiguration, FormGroupConfiguration, FormGroupField, RadioButtonConfiguration, TextareaConfiguration } from 'src/app/framework/form-group/form-group.component';

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

  formGroupConfiguration = {
    caption: 'This is the caption',
    payload: {},
    endpoint: endpoints.account,
    fields: [
      {
        name: 'email',
        caption: 'Email caption',
        type: 'input',
        validators: [Validators.email],
      } as FormGroupField,
      {
        name: 'password',
        caption: 'Password caption',
        type: 'password',
        validators: [Validators.required]
      } as FormGroupField,
      {
        name: 'newPassword',
        caption: 'New Password caption',
        type: 'password',
        validators: [Validators.required]
      } as FormGroupField,
      {
        name: 'dropdown',
        caption: 'Dropdown',
        type: 'dropdown',
        configuration: {
          values: [{
            key: '1',
            value: 'value 1'
          }, {
            key: '2',
            value: 'value 2'
          }, {
            key: '3',
            value: 'value 3'
          }],
        } as DropdownConfiguration,
        validators: [Validators.required]
      } as FormGroupField,
      {
        name: 'radiobutton',
        caption: 'Radiobutton',
        type: 'radiobutton',
        configuration: {
          values: [{
            key: '1',
            value: 'value 1'
          }, {
            key: '2',
            value: 'value 2'
          }, {
            key: '3',
            value: 'value 3'
          }],
        } as RadioButtonConfiguration,
        validators: [Validators.required]
      } as FormGroupField,
      {
        name: 'datepicker',
        caption: 'Datepicker',
        type: 'datepicker',
        validators: [Validators.required]
      } as FormGroupField,
      {
        name: 'textarea',
        caption: 'Textarea',
        type: 'textarea',
        configuration: {
          maxlength: 150,
        } as TextareaConfiguration,
        validators: [Validators.required]
      } as FormGroupField,
      {
        name: 'checkbox',
        caption: 'Checkbox',
        type: 'checkbox',
      } as FormGroupField,
      {
        name: 'label',
        caption: 'Label',
        type: 'label',
      } as FormGroupField,
    ],
    loadData: false,
  } as FormGroupConfiguration;
}
