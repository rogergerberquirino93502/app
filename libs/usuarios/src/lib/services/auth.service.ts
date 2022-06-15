import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLUsuarios = environment.apiUrl + 'usuarios';

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router) {}

    login(correo: string, password: string): Observable<Usuario>{
      return this.http.post<Usuario>(`${this.apiURLUsuarios}/login`, {correo, password});
    }

    logout(){
      this.token.removeToken(); // remove token from localStorage
      this.router.navigate(['/login']); // redirect to login page
    }
}
