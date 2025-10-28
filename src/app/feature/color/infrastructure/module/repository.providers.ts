import {  Provider } from "@angular/core";
import { ColorRepository } from "../../application/port/color.repository";
import { ColorHttpRepository } from "../http/repository/color.http-repository";
import { HttpClient } from "@angular/common/http";

const providers: Provider[] =[
    {
        provide: ColorRepository, 
        useClass:ColorHttpRepository, 
        deps: [HttpClient]
    }
]
export default providers