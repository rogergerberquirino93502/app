import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '@seminario/productos';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-listado-productos',
  templateUrl: './listado-productos.component.html',
  styles: [
  ]
})
export class ListadoProductosComponent implements OnInit {
  
  productos = [];


  constructor(
    private productosService: ProductosService,
    private messageServices: MessageService, 
    private confirmationService: ConfirmationService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this._getProductos();
  }


  private _getProductos() {
    this.productosService.getProductos()
    .subscribe(
        (productos) => {
          this.productos = productos;
        });
  }
  actualizarProducto(productoid: string) {
    this.router.navigateByUrl(`productos/form/${productoid}`);
  }
  eliminarProducto(productoid: string) {
      this.confirmationService.confirm({
        message: 'Quieres eliminar el producto?',
        header: 'Eliminar Producto',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.productosService.eliminarProducto(productoid)
          .subscribe(//elimina la categoria
          () => {//si se elimina la categoria
          this._getProductos();
          this.messageServices.add({//mensaje de exito
            severity:'success', 
            summary:'Producto Eliminada', 
            detail:'Producto Eliminada'
          }); 
        },
        () => {
          this.messageServices.add({//mensaje de error
            severity:'error', 
            summary:'Error', 
            detail:'Error al Eliminar el Producto'
        });
      });
        },
    });
    }
}

