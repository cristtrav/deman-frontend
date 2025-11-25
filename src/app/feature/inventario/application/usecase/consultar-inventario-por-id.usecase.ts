import { map, Observable } from "rxjs";
import { InventarioRepository } from "../port/inventario.repository";
import { Inventario } from "../model/inventario.model";

export class ConsultarInventarioPorIdUseCase {
    
    constructor(
        private inventarioRepository: InventarioRepository
    ){}

    execute(id: number): Observable<Inventario> {
        return this.inventarioRepository.findById(id);
    }
}