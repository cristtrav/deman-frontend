import { Provider } from "@angular/core";
import marcaProviders from "./feature/marca/infrastructure/module/marca.providers";
import colorProviders from "./feature/color/infrastructure/module/color.providers";
import tipoProviders from "./feature/tipo/infrastructure/module/tipo.providers";
import clienteProviders from "./feature/cliente/infrastructure/module/cliente.provider";
import productoProviders from "./feature/producto/infrastructure/module/producto.providers";
import inventarioProviders from "./feature/inventario/infrastructure/module/inventario.provider";

const appProviders: Provider[] = [
    ...marcaProviders, 
    ...colorProviders, 
    ...tipoProviders, 
    ...clienteProviders,
    ...productoProviders,
    ...inventarioProviders
]
    
export default appProviders;