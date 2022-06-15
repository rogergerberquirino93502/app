import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '@env/environment';
import * as listaciudades from 'i18n-iso-countries';
import { map } from 'rxjs/operators';
declare const require;


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiURLUsuarios = environment.apiUrl + 'usuarios';
  constructor(private http: HttpClient) {
    listaciudades.registerLocale(require("i18n-iso-countries/langs/en.json"));
   }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURLUsuarios);
  }
  getUsuario(usuarioId : string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURLUsuarios}/${usuarioId}`);
  }
  crearUsuario(usuario: Usuario): Observable<Usuario>{
      return this.http.post<Usuario>(this.apiURLUsuarios, usuario);
  }
  
  actualizarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiURLUsuarios}/${usuario.id}`, usuario);
}

  eliminarUsuario(usuarioId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiURLUsuarios}/${usuarioId}`);
  }
  getCountUsuarios(): Observable<number> {
    return this.http.get<number>(`${this.apiURLUsuarios}/get/count`)
    .pipe(map((objectValue: any) => objectValue.contarUsuario));
  }
  getCiudad(ciudadKey: string):  string {
    return listaciudades.getName(ciudadKey, "en");
  }
}
