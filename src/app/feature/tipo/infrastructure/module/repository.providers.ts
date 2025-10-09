import { Provider } from "@angular/core";
import { TipoRepository } from "../../application/port/tipo.repository";
import { TipoHttpRepository } from "../http/repository/tipo.http-repository";
import { HttpClient } from "@angular/common/http";

const providers: Provider[] = [
    {
        provide: TipoRepository,
        useClass: TipoHttpRepository,
        deps: [ HttpClient ]
    }
]

export default providers;