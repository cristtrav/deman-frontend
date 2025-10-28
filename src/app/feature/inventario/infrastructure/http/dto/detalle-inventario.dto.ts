export interface DetalleInventarioDTO {
    id: number;
    producto: {
        id: number,
        descripcion: string,
        unidadMedida: {
            id: string,
            descripcion: { singular: string, plural: string },
            abreviatura: { singular: string, plural: string }
        };
    };
    variante: {
        id: number,
        descripcion?: string,
        color: { id: number, descripcion: string },
        tamanio: { id: number, descripcion: string }
    };
    cantidad: number;
    diferencia: number;
}