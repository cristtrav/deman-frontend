import { Provider } from "@angular/core";
import { MarcaRepository } from "../../application/port/marca.repository";
import { MarcaHttpRepository } from "../http/repository/marca.http-repository";
import { HttpClient } from "@angular/common/http";

const providers: Provider[] = [
    {
        provide: MarcaRepository,
        useClass: MarcaHttpRepository,
        deps: [ HttpClient ]
    }
]

export default providers;