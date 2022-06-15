import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria, CategoriasService} from '@seminario/productos';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'admin-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styles: [
  ]
})
export class ListaCategoriasComponent implements OnInit{
  categorias : Categoria[] = [];
 
  constructor(
    private messageServices: MessageService, 
    private serviceCategoria: CategoriasService,
    private confirmationService: ConfirmationService,
    private router: Router ) { }

    ngOnInit(): void {
      this._getCategorias();
    }

  eliminarCategoria(categoriaId: string){//elimina la categoria
    this.confirmationService.confirm({
      message: 'Quieres eliminar la categoria?',
      header: 'Eliminar Categoria',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceCategoria.eliminarCategoria(categoriaId)
        .subscribe(//elimina la categoria
        () => {//si se elimina la categoria
        this._getCategorias();
        this.messageServices.add({//mensaje de exito
          severity:'success', 
          summary:'Categoria Eliminada', 
          detail:'Categoria Eliminada'
        }); 
      },
      () => {
        this.messageServices.add({//mensaje de error
          severity:'error', 
          summary:'Error', 
          detail:'Error al Eliminar la categoria'
      });
    });
      },
  });
  }

  editarCategoria(categoriaId: string){//edita la categoria
    this.router.navigateByUrl(`categorias/form/${categoriaId}`);

  }

  private _getCategorias(){//obtiene las categorias
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   this.serviceCategoria
   .getCategorias()
   .subscribe((cats: any) => {//obtiene las categorias arreglos
    this.categorias = cats;
});

}
}