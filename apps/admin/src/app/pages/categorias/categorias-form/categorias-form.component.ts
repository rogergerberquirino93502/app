import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categoria, CategoriasService } from '@seminario/productos';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categorias-form',
  templateUrl: './categorias-form.component.html',
  styles: [
  ]
})
export class CategoriasFormComponent implements OnInit {
    
  form:  FormGroup;
  isSubmitted = false;
  modoEditar = false;
  currentCategoriaId: string;
  

  constructor(
    private messageServices: MessageService, 
    private formBuilder: FormBuilder, 
    private serviceCategoria: CategoriasService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      icono: ['', Validators.required],
      color: ['', Validators.required]
    });    

    
    this._editarCategoria();
  }


  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const categoria : Categoria = {
      id: this.currentCategoriaId,//
      nombre: this.form.value.nombre,
      icono: this.form.value.icono,
      color: this.form.value.color
    };
    if(this.modoEditar){
      this._actualizarCategoria(categoria)
    }else{
      this._addCategoria(categoria)
    }
  }


  private _addCategoria(categoria: Categoria){
    this.serviceCategoria.crearCategoria(categoria)
    .subscribe(
      (categoria: Categoria) => {
        this.messageServices.add({
          severity:'success', 
          summary:'Categoria Creada', 
          detail:`Categoria ${categoria.nombre}Creada`
        });    
        timer(2000).toPromise().then(() => {
          this.location.back();
        }); 
  },
      () => {
        this.messageServices.add({
          severity:'error', 
          summary:'Error', 
          detail:'Error al crear la categoria'
      });
    }
  );
  }

  private _actualizarCategoria(categoria: Categoria){
    this.serviceCategoria.actualizarCategoria(categoria)
    .subscribe(
      () => {
        this.messageServices.add({
          severity:'success', 
          summary:'Categoria Actualizada', 
          detail:'Categoria Actualizada'
        });    
        timer(2000).toPromise().then(() => {
          this.location.back();
        }); 
  },
      () => {
        this.messageServices.add({
          severity:'error', 
          summary:'Error', 
          detail:'Error al crear la categoria'
      });
    });
  }
  private _editarCategoria(){
    this.route.params
    .subscribe((params) => {
     if(params['id']){
       this.modoEditar = true;
       this.currentCategoriaId = params['id'];
       this.serviceCategoria.getCategoria(params['id'])
       .subscribe(categoria => {
        this.form.patchValue(categoria);//setea el formulario con la categorias  
       }
       )
     }
    })
  }
  onCancelar() {
    this.location.back();
  }

  get categoriaForm(): FormGroup {
    return this.form;
  }
  
}
