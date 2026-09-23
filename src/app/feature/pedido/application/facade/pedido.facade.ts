import { Injectable } from "@angular/core";
import { Pedido } from "../model/pedido.model";
import { BaseFacade } from "@shared/facade/base.facade";

@Injectable()
export class PedidoFacade extends BaseFacade<Pedido> {
  constructor() { super('http://localhost:3000/api/pedidos'); }
}