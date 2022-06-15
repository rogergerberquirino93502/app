/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido, PedidosService } from '@seminario/pedidos';
import { PEDIDO_ESTADO } from '../pedidos.constants';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styles: [
  ]
})
export class ListaPedidosComponent implements OnInit{

  pedidos: Pedido[]=[];
  pedidoEstados = PEDIDO_ESTADO;


  constructor(
    private servicePedido: PedidosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router : Router 
    ) {}
 

  ngOnInit(): void {
    this._getPedidos();
  }


  _getPedidos(){
    this.servicePedido.getPedidos()
    .subscribe((pedido) => {
      this.pedidos = pedido;
    });
  }

  verPedido(pedidoId){
    this.router.navigateByUrl(`pedidos/${pedidoId}`);
  }

  eliminarPedido(pedidoId: string){
  
      this.confirmationService.confirm({
        message: 'Quieres eliminar el pedido?',
        header: 'Eliminar Pedido',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.servicePedido.eliminarPedido(pedidoId)
          .subscribe(
            () => {
              this._getPedidos();
              this.messageService.add({
                severity: 'success',
                summary: 'Pedido Eliminado',
                detail: 'Pedido eliminado!'
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se puede eliminar!'
              });
            }
          );
        }
      });
    }
  }
  // Language: typescript