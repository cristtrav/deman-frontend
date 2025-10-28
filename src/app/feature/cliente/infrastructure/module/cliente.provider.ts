import { Provider } from "@angular/core";
import repositoryProviders from "./repository.providers";
import usecaseProviders from "./usecase.provider";

const clienteProviders: Provider[] = [
    ...repositoryProviders,
    ...usecaseProviders
]

export default clienteProviders;