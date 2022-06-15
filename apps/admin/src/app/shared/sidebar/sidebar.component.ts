import { Component, OnInit } from '@angular/core';
import { AuthService } from '@seminario/usuarios';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

    logoutUsuario() {
    this.authService.logout();

  }
  
}
