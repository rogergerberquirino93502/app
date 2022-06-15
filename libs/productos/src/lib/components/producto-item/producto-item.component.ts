import { Component, OnInit, Input} from '@angular/core';
import { Producto } from '../../models/producto';

@Component({
  selector: 'productos-producto-item',
  templateUrl: './producto-item.component.html',
  styles: [
  ]
})
export class ProductoItemComponent implements OnInit {
  
  @Input() producto: Producto;
  constructor() { }

  ngOnInit(): void {
  }

}
