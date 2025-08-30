import { Provider } from "@angular/core";
import repositoryProviders from "./repository.providers";
import usecaseProviders from "./usecase.providers";

const marcaProviders: Provider[] = [
    ...repositoryProviders,
    ...usecaseProviders
]

export default marcaProviders;