import { FeatureLayout } from "@core/presentation/layout/feature-layout/feature-layout";
import { DatePipe, DecimalPipe } from "@angular/common";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { ReactiveFormsModule } from "@angular/forms";
import { PagoForm } from "../../component/pago-form/pago-form";
import { PedidoFacade } from "../../../application/facade/pedido.facade";
import { PagoFacade } from "../../../application/facade/pago.facade";
import { PagoCommandFacade } from "../../../application/facade/pago-command.facade";

export default {
    imports: [
        FeatureLayout,
        NzTableModule,
        NzModalModule,
        DecimalPipe,
        DatePipe,
        PagoForm,
        NzButtonModule,
        NzIconModule,
        NzFlexModule,
        NzGridModule,
        NzDescriptionsModule,
        NzSpinModule,
        NzTagModule,
        NzFormModule,
        NzInputModule,
        ReactiveFormsModule
    ],
    providers: [
        PedidoFacade,
        PagoFacade,
        PagoCommandFacade
    ],
}
