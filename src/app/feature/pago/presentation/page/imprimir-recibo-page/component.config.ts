import { DatePipe, DecimalPipe } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { ReciboFacade } from "../../../application/facade/recibo.facade";

export default {
    imports: [
        DatePipe,
        DecimalPipe,
        NzButtonModule,
        NzIconModule
    ],
    providers: [
        ReciboFacade
    ]
}
