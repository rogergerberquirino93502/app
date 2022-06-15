import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  apiURLCategorias = environment.apiUrl + 'categorias';
  constructor(private http: HttpClient
    ) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiURLCategorias);
  }
  getCategoria(categoriaId : string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiURLCategorias}/${categoriaId}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria>{
      return this.http.post<Categoria>(this.apiURLCategorias, categoria);
  }
  
  actualizarCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.apiURLCategorias}/${categoria.id}`, categoria);
}

  eliminarCategoria(categoriaId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiURLCategorias}/${categoriaId}`);
  }

}
