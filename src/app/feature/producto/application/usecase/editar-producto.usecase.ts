import { CommandContract } from "@core/application/contract/command/command.contract";
import { ProductoRepository } from "../port/producto.repository";
import { Producto } from "../model/producto.model";
import { Observable } from "rxjs";

interface ProductoData {
    previousId: number,
    id: number,
    descripcion: string;
    precio: number,
    idmarca: number,
    idcategoria: number,
    idtipo: number,
    idunidadMedida: string;
}

export class EditarProductoUseCase {
    constructor(
        private productoRepository: ProductoRepository
    ){}

    execute(command: CommandContract<ProductoData>): Observable<Producto> {
        return this.productoRepository.edit(command.data.previousId, {
            id: command.data.id,
            descripcion: command.data.descripcion,
            precio: command.data.precio,
            idmarca: command.data.idmarca,
            idcategoria: command.data.idcategoria,
            idtipo: command.data.idtipo,
            idunidadMedida: command.data.idunidadMedida
        });
    }
}