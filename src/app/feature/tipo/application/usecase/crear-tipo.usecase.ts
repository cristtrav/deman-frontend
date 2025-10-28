import { CommandContract } from "@core/application/contract/command/command.contract";
import { TipoRepository } from "../port/tipo.repository";
import { NewTipo } from "../model/new-tipo.model";
import { Observable } from "rxjs";
import { Tipo } from "../model/tipo.model";

export class CrearTipoUseCase {
    constructor(readonly tipoRepository: TipoRepository) { }

    execute(command: CommandContract<NewTipo>): Observable<Tipo> {
        return this.tipoRepository.create({
            id: command.data.id,
            descripcion: command.data.descripcion
        })
    }
}