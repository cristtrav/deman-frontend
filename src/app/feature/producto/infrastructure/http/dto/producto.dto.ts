export interface ProductoDTO {
    id: number;
    descripcion: string;
    precio: string,
    marca: { id: number, descripcion: string }
    tipo: { id: number, descripcion: string }
    categoria: { id: number, descripcion: string }
    unidadMedida: {
        id: string,
        descripcion: { singular: string, plural: string }
        abreviatura: { singular: string, plural: string }
    }
}