import { QueryContract } from "@core/application/contract/query/query.contract";
import { Observable } from "rxjs";
import { Color } from "../model/color.model";
import { NewColor } from "../model/new-color.model";

export abstract class ColorRepository {
    abstract findMany (query: QueryContract): Observable<Color[]>;
    abstract create(color: NewColor): Observable<Color>;
    abstract edit(previousId: number, color: Color): Observable<Color>;
    abstract delete(id: number): Observable<void>;
}