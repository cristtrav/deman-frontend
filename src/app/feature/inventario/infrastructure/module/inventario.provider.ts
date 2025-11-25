import { Provider } from "@angular/core";
import repositoryProviders from "./repository.providers";
import usecaseProviders from "./usecase.providers";

const inventarioProviders: Provider[] = [
    ...repositoryProviders,
    ...usecaseProviders
]
export default inventarioProviders;