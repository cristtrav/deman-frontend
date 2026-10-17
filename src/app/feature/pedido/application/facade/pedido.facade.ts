import { environment } from "@environment/environment";
import { Injectable } from "@angular/core";
import { Pedido } from "../../domain/model/pedido.model";
import { BaseFacade } from "@shared/facade/base.facade";

@Injectable()
export class PedidoFacade extends BaseFacade<Pedido> {
  constructor() { super(`${environment.apiURL}/pedidos`); }
}