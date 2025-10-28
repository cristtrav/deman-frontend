export interface Variante {
    id: number;
    descripcion?: string;
    color: { id: number, descripcion: string }
    tamanio: { id: number, descripcion: string }
}