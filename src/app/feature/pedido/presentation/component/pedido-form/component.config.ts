import { ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzModalModule } from "ng-zorro-antd/modal";
import { PedidoCommandFacade } from "../../../application/facade/pedido-command.facade";
import { ClienteForm } from "../../../../cliente/presentation/component/cliente-form/cliente-form";

export default {
    imports: [
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzDatePickerModule,
        NzButtonModule,
        NzSelectModule,
        NzInputNumberModule,
        NzIconModule,
        NzModalModule,
        ClienteForm
    ],
    providers: [
        PedidoCommandFacade
    ]
}