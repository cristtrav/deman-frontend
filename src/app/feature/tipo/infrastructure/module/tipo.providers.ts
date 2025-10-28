import { Provider } from "@angular/core";
import repositoryProviders from "./repository.providers";
import usecaseProviders from "./usecase.providers";

const tipoProviders: Provider[] = [
    ...repositoryProviders,
    ...usecaseProviders
]

export default tipoProviders;