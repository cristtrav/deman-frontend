import { Injectable } from "@angular/core";
import { CommandFacade } from "@shared/facade/command.facade";
import { Pago } from "../../domain/model/pago.model";
import { NewPago } from "../model/new-pago.model";
import { EditPago } from "../model/edit-pago.model";

@Injectable()
export class PagoCommandFacade extends CommandFacade<Pago, NewPago, EditPago> {
    constructor(){ super('http://localhost:3000/api/pagos'); }
}
