import { CommandContract } from "@core/application/contract/command/command.contract";
import { ColorRepository } from "../port/color.repository";
import { Observable } from "rxjs";

export class EliminarColorUseCase {
    constructor(readonly colorRepository: ColorRepository) { }
    execute(command: CommandContract<number>): Observable<void> {
        return this.colorRepository.delete(command.data)
    }
}