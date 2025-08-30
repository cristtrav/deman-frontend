import { Provider } from "@angular/core";
import marcaProviders from "./feature/marca/infrastructure/module/marca.providers";

const appProviders: Provider[] = [
    ...marcaProviders
]
    
export default appProviders;