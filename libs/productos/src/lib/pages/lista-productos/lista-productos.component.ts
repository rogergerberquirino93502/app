import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { Producto } from '../../models/producto';
import { CategoriasService } from '../../services/categorias.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lista-productos',
  templateUrl: './lista-productos.component.html',
  styles: [
  ]
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = [];
  categorias: Categoria[] = [];
  constructor(
    private prodService: ProductosService,
    private catService: CategoriasService
  ) { }

  ngOnInit(): void {
    this._getProductos();
    this._getCategorias();
  }

  private _getProductos(){
    this.prodService.getProductos()
    .subscribe(
      (resProductos) => {
        this.productos = resProductos;
      });
  }

  private _getCategorias(){
    this.catService.getCategorias()
    .subscribe(
      (resCategorias) => {
      this.categorias = resCategorias;   
      });
  }

  catFiltro(){
    const selecCategorias = this.categorias
    .filter((categoria) => categoria.checked)
    .map((categoria) => categoria.id);
    this._getCategorias();
  }

}
