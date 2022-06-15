import { Component, OnInit } from '@angular/core';
import { PedidosService } from '@seminario/pedidos';
import { ProductosService } from '@seminario/productos';
import { UsuariosService } from '@seminario/usuarios';
import { combineLatest} from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  statistics = [];

  constructor(
    private serviceUsuario: UsuariosService,
    private serviceProducto: ProductosService,
    private servicePedido: PedidosService,
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.servicePedido.getCountsPedido(),
      this.serviceUsuario.getCountUsuarios(),
      this.serviceProducto.getCountProducto(),
      this.servicePedido.getTotalVentas()
    ])
    .subscribe((values) =>{
      this.statistics = values;
    });
  }

}
