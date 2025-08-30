import { ResultPageContract } from "./result-page.contract";

export interface ResultContract<T>{
    data: T;
    page?: ResultPageContract
}