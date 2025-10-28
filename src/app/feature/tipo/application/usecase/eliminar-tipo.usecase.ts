import { CommandContract } from "@core/application/contract/command/command.contract";
import { TipoRepository } from "../port/tipo.repository";
import { Observable } from "rxjs";

export class EliminarTipoUseCase {
    constructor(readonly tipoRepository: TipoRepository) { }

    execute(command: CommandContract<number>): Observable<void> {
        return this.tipoRepository.delete(command.data)
    }
}