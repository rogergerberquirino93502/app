import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from '@env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorageToken: LocalstorageService) {}// private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.localStorageToken.getToken();// this.authService.getToken();
    const isAPIUrl = request.url.startsWith(environment.apiUrl);// si la url empieza con la url de la api

    if(token && isAPIUrl){
      request = request.clone({//Clona la petición
        setHeaders: {//Añade los headers
          Authorization: `Bearer ${token}`//Agrega el token al header
        }
      });
    } 

    return next.handle(request);
  }
}
