import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'usuarios-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formGroupLogin: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = "Usuario y Contraseña Incorrectos";
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private LocalStorage: LocalstorageService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this._loginForm();
  }

  private _loginForm(){
    this.formGroupLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    this.isSubmitted = true;

    if(this.formGroupLogin.invalid) return;
    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (usuario) => {
      this.authError = false;    
      this.LocalStorage.setToken(usuario['token']);
      this.router.navigate(['/']);
    },
    (error: HttpErrorResponse) =>{
      console.log(error);
      this.authError = true;
      if(error.status !== 400){
        this.authMessage = 'Error de Servidor, intente nuevamente';
      }
    }
    );
  }

  get loginForm(){
    return this.formGroupLogin.controls;
  }
}
