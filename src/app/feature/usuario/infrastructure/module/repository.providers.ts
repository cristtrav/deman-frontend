import { HttpClient } from "@angular/common/http";
import { UsuarioRepository } from "../../application/port/usuario.repository";
import { UsuarioHttpRepository } from "../http/repository/usuario.http-repository";
import { Provider } from "@angular/core";

const providers: Provider[] = [
    {
        provide: UsuarioRepository,
        useClass: UsuarioHttpRepository,
        deps: [ HttpClient ]
    }
]

export default providers;