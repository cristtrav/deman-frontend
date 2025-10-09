import { Provider } from "@angular/core";
import repositoryProviders from "./repository.providers";
import usecaseProviders from "./usecase.providers";

const colorProviders: Provider[] = [
    ...repositoryProviders,
    ...usecaseProviders
]

export default colorProviders;