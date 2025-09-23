import { Provider } from "@angular/core";
import marcaProviders from "./feature/marca/infrastructure/module/marca.providers";
import productoProviders from "./feature/producto/infrastructure/module/producto.providers";

const appProviders: Provider[] = [
    ...marcaProviders,
    ...productoProviders
]
    
export default appProviders;