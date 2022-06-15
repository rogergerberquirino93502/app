import { Usuario } from "@seminario/usuarios";
import { PedidoItem } from "./pedido-item";

export class Pedido {
  id?: string;
  pedidoItems?: PedidoItem[];
  direccion1?: string;
  direccion2?: string;
    zona?: string;
    ciudad?: string;
    telefono?: string;
    estado?: number;
    precioTotal?: string;
    usuario?: Usuario;
    fechaPedido?: Date;
}