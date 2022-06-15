import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListadoProductosComponent } from './pages/listado-productos/listado-productos.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductosModule } from '@seminario/productos';
import { UiModule } from '@seminario/ui';
import { HttpClientModule } from '@angular/common/http';

const router: Routes = [
    { path: '', component: HomePageComponent },
];

@NgModule({
    declarations: [AppComponent, 
        NxWelcomeComponent, 
        HomePageComponent, 
        ListadoProductosComponent, 
        HeaderComponent, 
        FooterComponent, 
        NavComponent],
    imports: [BrowserModule, 
        BrowserAnimationsModule,  
        RouterModule.forRoot(router), 
        HttpClientModule,
        ProductosModule,
        AccordionModule,
        UiModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
