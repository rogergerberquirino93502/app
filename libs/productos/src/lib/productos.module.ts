import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductoItemComponent } from './components/producto-item/producto-item.component';
import { DestacadosProductosComponent } from './components/destacados-productos/destacados-productos.component';
import  { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';

const routes: Routes = [{
  path: 'productos',
  component: ListaProductosComponent
}];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ButtonModule, CheckboxModule],
    declarations: [
    
    ProductsSearchComponent,
         CategoriesBannerComponent,
         ProductoItemComponent,
         DestacadosProductosComponent,
         ListaProductosComponent
  ],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductoItemComponent, DestacadosProductosComponent, ListaProductosComponent],
})
export class ProductosModule {}
