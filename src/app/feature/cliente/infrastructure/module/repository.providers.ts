import { Provider } from "@angular/core"
import { ClienteRepository } from "../../application/port/cliente.repository"
import { ClienteHttpRepository } from "../http/repository/cliente.http-repository"
import { HttpClient } from "@angular/common/http"

const providers: Provider[] =[
    {
        provide: ClienteRepository, 
        useClass:ClienteHttpRepository, 
        deps: [HttpClient]
    }
]
export default providers