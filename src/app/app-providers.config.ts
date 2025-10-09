import { Provider } from "@angular/core";
import marcaProviders from "./feature/marca/infrastructure/module/marca.providers";
import colorProviders from "./feature/color/infrastructure/module/color.providers";

const appProviders: Provider[] = [
    ...marcaProviders, 
    ...colorProviders
]
    
export default appProviders;