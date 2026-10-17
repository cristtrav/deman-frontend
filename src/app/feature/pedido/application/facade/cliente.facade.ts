import { environment } from "@environment/environment";
import { Injectable } from "@angular/core";
import { Cliente } from "../../domain/model/cliente.model";
import { BaseFacade } from "@shared/facade/base.facade";

@Injectable()
export class ClienteFacade extends BaseFacade<Cliente> {
  constructor() { super(`${environment.apiURL}/clientes`); }
}