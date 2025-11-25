export interface ProductoVarianteDTO {
    id: { idproducto: number, idvariante: number }
    producto: {
        id: number,
        descripcion: string,
        tipo: { id: number, descripcion: string },
        categoria: { id: number, descripcion: string },
        unidadMedida: {
            id: string,
            descripcion: { singular: string, plural: string },
            abreviatura: { singular: string, plural: string }
        }
    },
    variante: {
        id: number,
        descripcion?: string,
        tamanio: { id: number, descripcion: string },
        color: {id: number, descripcion: string }
    }
}