import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ShellComponent} from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaCategoriasComponent } from './pages/categorias/lista-categorias/lista-categorias.component';
import { ListadoProductosComponent } from './pages/productos/listado-productos/listado-productos.component';
import { FormProductosComponent } from './pages/productos/form-productos/form-productos.component';
import { CategoriasFormComponent } from './pages/categorias/categorias-form/categorias-form.component';
import { ListadoUsuariosComponent } from './pages/usuarios/listado-usuarios/listado-usuarios.component';
import { FormUsuariosComponent } from './pages/usuarios/form-usuarios/form-usuarios.component';
import { AuthGuardService, JwtInterceptor, UsuariosModule, UsuariosService } from '@seminario/usuarios';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriasService } from '@seminario/productos';
import { ProductosService } from '@seminario/productos';
import { PedidosService } from '@seminario/pedidos';
import {InputTextModule} from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {TagModule} from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import { ListaPedidosComponent } from './pages/pedidos/lista-pedidos/lista-pedidos.component';
import { PedidosDetallesComponent } from './pages/pedidos/pedidos-detalles/pedidos-detalles.component';
import {FieldsetModule} from 'primeng/fieldset';
import { RouterModule, Routes } from '@angular/router';

const UX_MODULES = [
    CardModule,
    ToastModule,
    InputTextModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
]

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuardService],
        children : [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'categorias',
                component: ListaCategoriasComponent
            },
            {
                path: 'categorias/form',
                component: CategoriasFormComponent
            },
            {
                path: 'categorias/form/:id',
                component: CategoriasFormComponent
            },
            {
                path: 'productos',
                component: ListadoProductosComponent
            },
            {
                path: 'productos/form',
                component: FormProductosComponent
            },
            {
                path: 'productos/form/:id',
                component: FormProductosComponent
            },
            {
                path: 'usuarios',
                component: ListadoUsuariosComponent
            },
            {
                path: 'usuarios/form',
                component: FormUsuariosComponent
            },
            {
                path: 'usuarios/form/:id',
                component: FormUsuariosComponent
            },
            {
                path: 'pedidos',
                component: ListaPedidosComponent
            },
            {
                path: 'pedidos/:id',
                component: PedidosDetallesComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
];
@NgModule({
    declarations: [AppComponent, 
        NxWelcomeComponent, 
        DashboardComponent, 
        ShellComponent,        
        SidebarComponent, 
        ListaCategoriasComponent, 
        CategoriasFormComponent, 
        ListadoProductosComponent, 
        FormProductosComponent, 
        ListadoUsuariosComponent, 
        FormUsuariosComponent, ListaPedidosComponent, PedidosDetallesComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabled'}),
        ReactiveFormsModule,
        UsuariosModule,
    ...UX_MODULES
],
    providers: [CategoriasService, ProductosService, UsuariosService, PedidosService, MessageService, ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
