import { Provider } from "@angular/core";
import marcaProviders from "./feature/marca/infrastructure/module/marca.providers";
import colorProviders from "./feature/color/infrastructure/module/color.providers";
import tipoProviders from "./feature/tipo/infrastructure/module/tipo.providers";

const appProviders: Provider[] = [
    ...marcaProviders, 
    ...colorProviders, 
    ...tipoProviders
]
    
export default appProviders;