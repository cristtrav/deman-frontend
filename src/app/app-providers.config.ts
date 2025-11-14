import { Provider } from "@angular/core";
import marcaProviders from "./feature/marca/infrastructure/module/marca.providers";
import colorProviders from "./feature/color/infrastructure/module/color.providers";
import tipoProviders from "./feature/tipo/infrastructure/module/tipo.providers";
import clienteProviders from "./feature/cliente/infrastructure/module/cliente.provider";
import usuarioProviders from "./feature/usuario/infrastructure/module/usuario.providers";

const appProviders: Provider[] = [
    ...marcaProviders, 
    ...colorProviders, 
    ...tipoProviders, 
    ...clienteProviders, 
    ...usuarioProviders
]
    
export default appProviders;