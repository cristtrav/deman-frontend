import { CommandContract } from "@core/application/contract/command/command.contract";
import { ProductoRepository } from "../port/producto.repository";
import { Observable } from "rxjs";
import { Producto } from "../model/producto.model";

interface ProductoData{
    id?: number,
    descripcion: string;
    precio: number;
    idmarca: number,
    idcategoria: number,
    idtipo: number,
    idUnidadMedida: string
}

export class CrearProductoUseCase {
    constructor(
        private productoRepository: ProductoRepository
    ){}

    execute(command: CommandContract<ProductoData>): Observable<Producto>{
        return this.productoRepository.create({
            id: command.data.id,
            descripcion: command.data.descripcion,
            precio: command.data.precio,
            idmarca: command.data.idmarca,
            idcategoria: command.data.idcategoria,
            idtipo: command.data.idtipo,
            idunidadMedida: command.data.idUnidadMedida
        });
    }
}