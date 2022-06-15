import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'productos-categorias-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriasService
  ) { }

  ngOnInit(): void {
    this._getCategorias();

   
  }
  private _getCategorias(){//obtiene las categorias
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.categoriaService
    .getCategorias()
    .subscribe((cats: any) => {//obtiene las categorias arreglos
     this.categorias = cats;
 });
}
}
