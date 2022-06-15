import { Location } from '@angular/common';
import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService, Producto, ProductosService } from '@seminario/productos';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-form-productos',
  templateUrl: './form-productos.component.html',
  styles: [
  ]
})
export class FormProductosComponent implements OnInit, OnDestroy{
  modoEditar = false;
  form: FormGroup;
  isSubmitted = false;
  catagorias = [];  
  imagenDisplay: string | ArrayBuffer;
  currentProductoId: string;
  endsubs$: Subject<any> = new Subject();


  constructor( private formBuilder: FormBuilder, 
    private serviceCategoria : CategoriasService,
    private serviceProducto : ProductosService,
    private messageServices: MessageService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategorias();
    this._editarProducto();
}

ngOnDestroy() {
  this.endsubs$.complete();
}

  private _initForm(){
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required],
      stock: ['', Validators.required],
      descripcion: ['', Validators.required],
      masdescripcion: [''],
      imagen: ['', Validators.required],
      destacado: [false]
    });
  }

  private _getCategorias(){
    this.serviceCategoria.getCategorias()
    .pipe(takeUntil(this.endsubs$))
    .subscribe(
      (categorias) => {
      this.catagorias = categorias;
    });
  }

  private _addProducto(productoData: FormData){
    this.serviceProducto.crearProducto(productoData)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(
      (producto: Producto) => {
        this.messageServices.add({
          severity:'success', 
          summary:'Producto Creada', 
          detail:`Producto ${producto.nombre}Creada`
        });    
        timer(2000).toPromise().then(() => {
          this.location.back();
        }); 
  },
      () => {
        this.messageServices.add({
          severity:'error', 
          summary:'Error', 
          detail:'Error al crear el producto'
      });
    }
  );
  }

  private _actualizarProducto(productoFormData: FormData){
    this.serviceProducto.actualizarProducto(productoFormData, this.currentProductoId)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(
      () => {
        this.messageServices.add({
          severity:'success', 
          summary:'Producto Actualizado', 
          detail:'Producto Actualizado'
        });    
        timer(2000).toPromise().then(() => {
          this.location.back();
        }); 
  },
      () => {
        this.messageServices.add({
          severity:'error', 
          summary:'Error', 
          detail:'Error al crear la producto'
      });
    });
  }

  private _editarProducto(){
    this.route.params
    .pipe(takeUntil(this.endsubs$))
    .subscribe((params) => {
      if(params['id']){
        this.modoEditar = true;
        this.currentProductoId = params['id'];
        this.serviceProducto.getProducto(params['id'])
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
          (producto) => {
            this.form.patchValue(producto);
            this.productoForm['nombre'].setValue(producto['nombre']);
            this.productoForm['marca'].setValue(producto['marca']);
            this.productoForm['precio'].setValue(producto['precio']);
            this.productoForm['categoria'].setValue(producto['categoria']['id']);
            this.productoForm['stock'].setValue(producto['stock']);
            this.productoForm['descripcion'].setValue(producto['descripcion']);
            this.productoForm['masdescripcion'].setValue(producto['masdescripcion']);
            this.imagenDisplay = producto['imagen'];
            this.productoForm['imagen'].setValidators([]);
            this.productoForm['imagen'].updateValueAndValidity();
          }
        );
      }
    })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid)return;

    const productoFormData= new FormData();
    Object.keys(this.productoForm).map((key) => {
      productoFormData.append(key, this.productoForm[key].value);
    });
    if(this.modoEditar){
      this._actualizarProducto(productoFormData);
    }else{
      this._addProducto(productoFormData);
    }
  }
  onCancelar() {
    this.location.back();
  }

  cargarImagen(event){
    const file = event.target.files[0];//obtenemos el archivo
    if(file){
      this.form.patchValue({imagen: file});//añadimos el archivo al formulario
      this.form.get('imagen').updateValueAndValidity();//para que se actualice el formulario
      const reader = new FileReader();//instanciamos el lector
      reader.onload = () => {
        this.imagenDisplay = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  get productoForm(){
    return this.form.controls;
  }
}