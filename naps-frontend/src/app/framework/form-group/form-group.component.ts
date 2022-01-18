import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { NapsApiService } from 'src/app/api/naps-api.service';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  @Input() formGroupConfiguration?: FormGroupConfiguration;
  form$?: Observable<FormGroup>;
  labels: FormGroupLabel[] = [];
  fields: FormGroupField[] = [];

  constructor(
    private api: NapsApiService,
  ) { }

  ngOnInit(): void {
    if (this.formGroupConfiguration && this.formGroupConfiguration.fields && this.formGroupConfiguration.loadData === true) {
      this.form$ = this.api.get(this.formGroupConfiguration.endpoint, this.formGroupConfiguration.payload).pipe(
        map(value => {
          let formGroup = new FormGroup({});

          if (this.formGroupConfiguration?.fields.some(field => field.type === 'label')) {
            this.labels = this.formGroupConfiguration?.fields.filter(field => field.type === 'label').map(field => ({
              label: field.caption,
              value: value.field?.value ?? ''
            } as FormGroupLabel));
          }

          this.fields = this.formGroupConfiguration?.fields.filter(field => field.type !== 'label') ?? [];

          this.formGroupConfiguration?.fields
            .filter(field => field.type !== 'label')
            .forEach(field =>
              formGroup.addControl(field.name, new FormControl(value.field?.value ?? '', field.validators))
            );

          return formGroup;
        }),
      );
    } else if (this.formGroupConfiguration && this.formGroupConfiguration.loadData === false) {
      let formGroup = new FormGroup({});
      this.fields = this.formGroupConfiguration?.fields.filter(field => field.type !== 'label') ?? [];
      this.formGroupConfiguration?.fields
        .filter(field => field.type !== 'label')
        .forEach(field =>
          formGroup.addControl(field.name, new FormControl('', field.validators))
        );
      this.labels = this.formGroupConfiguration?.fields.filter(field => field.type === 'label').map(field => ({
        label: field.caption,
        value: field.caption,
      } as FormGroupLabel));
      this.form$ = of(formGroup);
    }
  }

  pong?: Observable<string>;

  save(formgGroup: FormGroup) {
    if (this.formGroupConfiguration?.endpoint) {
      this.api.put(this.formGroupConfiguration.endpoint, { ...formgGroup.value }).subscribe();
    }
  }
}

export interface FormGroupConfiguration {
  caption: string,
  endpoint: string,
  payload: any,
  fields: FormGroupField[],
  loadData: boolean,
};

export interface FormGroupField {
  name: string,
  caption: string,
  type: FieldType,
  configuration: any,
  validators: ValidatorFn[] | undefined,
};

export interface FormGroupLabel {
  label: string,
  value: string,
}

export interface DropdownConfiguration {
  values: KeyValue<string, string>[],
}

export interface TextareaConfiguration {
  maxlength: number,
}

export interface RadioButtonConfiguration {
  values: KeyValue<string, string>[],
}

export type FieldType = 'label' | 'input' | 'dropdown' | 'datepicker' | 'textarea' | 'checkbox' | 'radiobutton' | 'password';
