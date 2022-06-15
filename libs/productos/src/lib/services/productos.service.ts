import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '@env/environment';
import { Producto } from '../models/producto';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  apiUrlProductos = environment.apiUrl + 'productos';
  constructor(private http: HttpClient
    ) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrlProductos);
  }
  getProducto(productoId : string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrlProductos}/${productoId}`);
  }
  
  getCountProducto(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlProductos}/get/count`)
    .pipe(map((objectValue: any) => objectValue.contarProducto));
  }

  crearProducto(productoData: FormData): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrlProductos, productoData);
  }

  actualizarProducto(productoData: FormData, productoid: string): Observable<Producto>{
    return this.http.put<Producto>(`${this.apiUrlProductos}/${productoid}`, productoData);
  }

  eliminarProducto(productoId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrlProductos}/${productoId}`);
  }

  getFeaturedProductos(count: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrlProductos}/get/featured/${count}`);
  }

    /*
  crearCategoria(categoria: Categoria): Observable<Categoria>{
      return this.http.post<Categoria>(this.apiURLCategorias, categoria);
 
  
  


  
  }*/

}
