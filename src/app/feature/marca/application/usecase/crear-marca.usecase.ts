import { CommandContract } from "@core/application/contract/command/command.contract";
import { Marca } from "../model/marca.model";
import { MarcaRepository } from "../port/marca.repository";
import { Observable } from "rxjs";
import { NewMarca } from "../model/new-marca.model";

export class CrearMarcaUseCase {

    constructor(readonly marcaRepository: MarcaRepository){}

    execute(command: CommandContract<NewMarca>): Observable<Marca>{
        return this.marcaRepository.create({
            id: command.data.id,
            descripcion: command.data.descripcion
        });
    }
}