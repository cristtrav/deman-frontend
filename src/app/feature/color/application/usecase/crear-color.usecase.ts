import { CommandContract } from "@core/application/contract/command/command.contract";
import { ColorRepository } from "../port/color.repository";
import { NewColor } from "../model/new-color.model";
import { Observable } from "rxjs";
import { Color } from "../model/color.model";

export class CrearColorUseCase {
    constructor(readonly colorRepository: ColorRepository){}
    execute(command: CommandContract<NewColor>): Observable<Color>{
        return this.colorRepository.create({
            id: command.data.id,
            descripcion: command.data.descripcion
        })
    }
}