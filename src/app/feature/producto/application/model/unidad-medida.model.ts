interface Conjugacion{
    singular: string,
    plural: string
}

export interface UnidadMedida{
    id: string,
    descripcion: Conjugacion,
    abreviatura: Conjugacion
}