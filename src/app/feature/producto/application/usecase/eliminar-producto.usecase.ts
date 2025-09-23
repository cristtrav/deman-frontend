import { Observable } from "rxjs";
import { ProductoRepository } from "../port/producto.repository";
import { CommandContract } from "@core/application/contract/command/command.contract";

interface ProductoData {
    id: number
}

export class EliminarProductoUseCase {
    constructor(
        private productoRepository: ProductoRepository
    ){}

    execute(command: CommandContract<ProductoData>): Observable<void> {
        return this.productoRepository.delete(command.data.id);
    }
}