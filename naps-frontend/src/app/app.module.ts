import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './api/authInterceptor';
import { ErrorHandlingComponent } from './api/error-handling/error-handling.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginSuccessComponent } from './pages/login-success/login-success.component';
import { LoginComponent } from './pages/login/login.component';
import { FormGroupComponent } from './framework/form-group/form-group.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginSuccessComponent,
    ErrorHandlingComponent,
    FormGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
