import { CommandContract } from "@core/application/contract/command/command.contract";
import { Color } from "../model/color.model";
import { ColorRepository } from "../port/color.repository";
import { Observable } from "rxjs";

interface EditarColorCommand extends CommandContract<Color> {
    previousId: number;
}

export class EditarColorUseCase {
    constructor(readonly colorRepository: ColorRepository) { }

    execute(command: EditarColorCommand): Observable<Color> {
        return this.colorRepository.edit(command.previousId, command.data)
    }
}