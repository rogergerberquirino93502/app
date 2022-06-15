import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'productos-destacados-productos',
  templateUrl: './destacados-productos.component.html',
  styles: [
  ]
})
export class DestacadosProductosComponent implements OnInit {

  destacarProductos: Producto[] = [];
  constructor(
    private prodService: ProductosService
  ) { }

  ngOnInit(): void {
  this._getProductosDestacados();
  }
  _getProductosDestacados(){
    this.prodService.getFeaturedProductos(4).subscribe((productos) => {
      this.destacarProductos = productos;
    })
  }
}
