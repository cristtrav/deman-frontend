import { Provider } from "@angular/core";
import usecaseProviders from "./usecase.providers";
import repositoryProviders from "./repository.providers";

const usuarioProviders: Provider[] = [
    ...repositoryProviders,
    ...usecaseProviders
]

export default usuarioProviders;