import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario, UsuariosService } from '@seminario/usuarios';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import *  as listaciudades from 'i18n-iso-countries';
import *  as lista from 'territory-gt';

declare const require;

@Component({
  selector: 'admin-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styles: [
  ]
})
export class FormUsuariosComponent implements OnInit {

  form:  FormGroup;
  isSubmitted = false;
  modoEditar = false;
  currentUsuarioId: string;
  ciudades = [];
  departamentos =  [] ;
  municipios = [];


  constructor(
    private messageServices: MessageService, 
    private formBuilder: FormBuilder, 
    private serviceUsuario: UsuariosService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCiudades();
    this._getDepartamento();
    this._getMunicipio();
    this._editarUsuario();
  }

  private _initUserForm(){
    this.form = this.formBuilder.group({
      nombreu: ['', Validators.required],
      password: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      rol: [false],
      ciudad: [''],
      departamento: [''],
      municipio: [''],
      calle: [''],
      zona: ['']
    });    
  }

  private _getCiudades(){
    listaciudades.registerLocale(require("i18n-iso-countries/langs/es.json"));
    this.ciudades = Object.entries(listaciudades.getNames("es", {select: "official"})).map((entry) => {
      return {
        id: entry[0],
        nomc: entry[1]
      }
    }); 
  }
  

    private _getDepartamento(){
     this.departamentos = Object.entries(lista.departamentos()).map((departamento) => {
      return {
        id: departamento[0],  
        depto: departamento[1]
      }
    });    
    }
    
     
    private _getMunicipio(){
      this.municipios = Object.entries(lista.municipios()).map((muni) => {
        return {
          id : muni [0][1],  
          municipio: muni[0],
        }
      });
      console.log(this.municipios);
}

  private _addUsuario(usuario: Usuario){
    this.serviceUsuario.crearUsuario(usuario).subscribe(
      (usuario: Usuario) => {
        this.messageServices.add({
          severity:'success', 
          summary:'Usuario Creado', 
          detail:`Usuario ${usuario.nombreu} Creada`
        });    
        timer(2000).toPromise().then(() => {
          this.location.back();
        }); 
  },
      () => {
        this.messageServices.add({
          severity:'error', 
          summary:'Error', 
          detail:'Error al crear el usuario'
      });
    }
  );
  }
  
  private _actualizarUsuario(usuario: Usuario){
    this.serviceUsuario.actualizarUsuario(usuario).subscribe(
      () => {
        this.messageServices.add({
          severity:'success', 
          summary:'Usuario Actualizado', 
          detail:'usuario Actualizado'
        });    
        timer(2000).toPromise().then(() => {
          this.location.back();
        }); 
  },
      () => {
        this.messageServices.add({
          severity:'error', 
          summary:'Error', 
          detail:'Error al crear el usuario'
      });
    });
  }

  private _editarUsuario(){
    this.route.params.subscribe((params) => {
     if(params['id']){
       this.modoEditar = true;
       this.currentUsuarioId = params['id'];
       this.serviceUsuario.getUsuario(params['id']).subscribe(
         (usuario) => {
        this.usuarioForm['nombreu'].setValue(usuario['nombreu']);
        this.usuarioForm['correo'].setValue(usuario['correo']);
        this.usuarioForm['telefono'].setValue(usuario['telefono']);
        this.usuarioForm['rol'].setValue(usuario['rol']);
        this.usuarioForm['ciudad'].setValue(usuario['ciudad']);
        this.usuarioForm['departamento'].setValue(usuario['departamento']);
        this.usuarioForm['municipio'].setValue(usuario['municipio']);
        this.usuarioForm['calle'].setValue(usuario['calle']);
        this.usuarioForm['zona'].setValue(usuario['zona']);
        
        this.usuarioForm['password'].setValidators([]);
        this.usuarioForm['password'].updateValueAndValidity(); 
       });
     }
    });
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const usuario : Usuario = {
      id: this.currentUsuarioId,//
      nombreu: this.form.value.nombreu,
      correo: this.form.value.correo,
      password: this.form.value.password,
      telefono: this.form.value.telefono,
      rol: this.form.value.rol,
      ciudad: this.form.value.ciudad,
      departamento: this.form.value.departamento,
      municipio: this.form.value.municipio,
      calle: this.form.value.calle,
      zona: this.form.value.zona
    };
    if(this.modoEditar){
      this._actualizarUsuario(usuario)
    }else{
      this._addUsuario(usuario)
    }
  }

  onCancelar() {
    this.location.back();
  }
  get usuarioForm(){
    return this.form.controls;
  }
  
}
