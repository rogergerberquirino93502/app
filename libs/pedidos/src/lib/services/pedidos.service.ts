import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../models/pedido';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  apiURLPedidos = environment.apiUrl + 'pedidos';
  constructor(private http: HttpClient
    ) { }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiURLPedidos);
  }

  getPedido(pedidoId : string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiURLPedidos}/${pedidoId}`);
  }

  
  crearPedido(pedido: Pedido): Observable<Pedido>{
      return this.http.post<Pedido>(this.apiURLPedidos, pedido);
  }
  
  actualizarPedido(pedidoEstado: {estado : string}, pedidoid: string): Observable<Pedido>{
    return this.http.put<Pedido>(`${this.apiURLPedidos}/${pedidoid}`, pedidoEstado);
}

  eliminarPedido(pedidoId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiURLPedidos}/${pedidoId}`);
  }
  getCountsPedido(): Observable<number> {
    return this.http.get<number>(`${this.apiURLPedidos}/get/count`)
    .pipe(map((objectValue: any) => objectValue.contarPedido));
  }

  getTotalVentas(): Observable<number> {
    return this.http.get<number>(`${this.apiURLPedidos}/get/totalvendido`)
    .pipe(map((objectValue: any) => objectValue.totalvendido));
  }

}
