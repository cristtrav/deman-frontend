import { Provider } from "@angular/core";
import marcaProviders from "./feature/marca/infrastructure/module/marca.providers";
import productoProviders from "./feature/producto/infrastructure/module/producto.providers";
import inventarioProviders from "./feature/inventario/infrastructure/module/inventario.provider";

const appProviders: Provider[] = [
    ...marcaProviders,
    ...productoProviders,
    ...inventarioProviders
]
    
export default appProviders;