import { ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { PagoCommandFacade } from "../../../application/facade/pago-command.facade";

export default {
    imports: [
        ReactiveFormsModule,
        NzFormModule,
        NzDatePickerModule,
        NzButtonModule,
        NzInputNumberModule,
        NzIconModule
    ],
    providers: [
        PagoCommandFacade
    ]
}
