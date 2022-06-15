import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido, PedidosService } from '@seminario/pedidos';
import { MessageService} from 'primeng/api';
import { PEDIDO_ESTADO } from '../pedidos.constants';
@Component({
  selector: 'admin-pedidos-detalles',
  templateUrl: './pedidos-detalles.component.html',
  styles: [
  ]
})
export class PedidosDetallesComponent implements OnInit {
  pedido: Pedido;
  pedidoStatus = [];
  seleccionarEstado: any;


  constructor(private servicePedido: PedidosService,
    private messageService: MessageService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this._getPedido();
    this._mapPedidoStatus();
  }



private _mapPedidoStatus(){
  this.pedidoStatus = Object.keys(PEDIDO_ESTADO).map(key => {
    return {
      id: key,
      nombre: PEDIDO_ESTADO[key].label
    };
  }) ;

}

private _getPedido(){
  this.route.params.subscribe((params) => {
   if(params['id']){
    this.servicePedido.getPedido(params['id'])
    .subscribe((pedido) => {
      this.pedido = pedido;
      this.seleccionarEstado = pedido.estado;
    });
   }
    });
}

onStatusChange(event){
  this.servicePedido.actualizarPedido({estado: event.value}, this.pedido.id)
  .subscribe(() => {
  this.messageService.add({
    severity: 'success',
    summary: 'Pedido Actualizado',
    detail: 'El pedido se actualizo correctamente'
  });
  },
  () => {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo actualizar el pedido'
    });
  });
}


}
