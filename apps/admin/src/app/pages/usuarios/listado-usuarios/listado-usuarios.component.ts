import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '@seminario/usuarios';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styles: [
  ]
})
export class ListadoUsuariosComponent implements OnInit {
  usuarios : Usuario[] = [];

  constructor(
    private messageServices: MessageService, 
    private serviceUsuario: UsuariosService,
    private confirmationService: ConfirmationService,
    private router: Router ) { }

    ngOnInit(): void {
      this._getUsuarios();
    }

  
  eliminarUsuario(usuarioId: string){//elimina la categoria
    this.confirmationService.confirm({
      message: 'Quieres eliminar el usuario?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceUsuario.eliminarUsuario(usuarioId)
        .subscribe(//elimina la categoria
        () => {//si se elimina la categoria
        this._getUsuarios();
        this.messageServices.add({//mensaje de exito
          severity:'success', 
          summary:'Usuario Eliminada', 
          detail:'Usuario Eliminada'
        }); 
      },
      () => {
        this.messageServices.add({//mensaje de error
          severity:'error', 
          summary:'Error', 
          detail:'Error al Eliminar el usuario'
      });
    });
      },
  });
  }

  actualizarUsuario(usuarioId: string){//edita la categoria
    this.router.navigateByUrl(`usuarios/form/${usuarioId}`);

  }

  getCiudadNombre(ciudadKey: string){//obtiene el nombre de la ciudad
    if(ciudadKey)     return this.serviceUsuario.getCiudad(ciudadKey);

  }

  
private _getUsuarios(){//obtiene las categorias
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   this.serviceUsuario.getUsuarios()
   .subscribe((users) => {//obtiene las categorias arreglos
    this.usuarios = users;
})

}


}
