import { Provider } from "@angular/core";
import repositoryProviders from "./repository.providers";
import usecaseProviders from "./usecase.providers";

const productoProviders: Provider[] = [
    ...repositoryProviders,
    ...usecaseProviders
]

export default productoProviders;