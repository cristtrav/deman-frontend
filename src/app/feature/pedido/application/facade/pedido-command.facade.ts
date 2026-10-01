import { NewPedido } from "../model/new-pedido.model";
import { Pedido } from "../../domain/model/pedido.model";
import { Injectable, } from "@angular/core";
import { EditPedido } from "../model/edit-pedido.model";
import { CommandFacade } from "@shared/facade/command.facade";

@Injectable()
export class PedidoCommandFacade extends CommandFacade<Pedido, NewPedido, EditPedido> {
    constructor(){ super('http://localhost:3000/api/pedidos'); }
}