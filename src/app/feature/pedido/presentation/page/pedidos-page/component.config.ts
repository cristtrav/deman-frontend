import { FeatureLayout } from "@core/presentation/layout/feature-layout/feature-layout";
import { NzTableModule } from "ng-zorro-antd/table";
import { PedidoFacade } from "../../../application/facade/pedido.facade";
import { DatePipe, DecimalPipe } from "@angular/common";
import { NzModalModule } from "ng-zorro-antd/modal";
import { PedidoForm } from "../../component/pedido-form/pedido-form";
import { NzButtonModule } from "ng-zorro-antd/button";
import { ClienteFacade } from "../../../application/facade/cliente.facade";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzFlexModule } from "ng-zorro-antd/flex";
import { NzTagModule } from "ng-zorro-antd/tag";
import { PedidoCommandFacade } from "../../../application/facade/pedido-command.facade";

export default {
    imports: [
        FeatureLayout,
        NzTableModule,
        NzModalModule,
        DecimalPipe,
        DatePipe,
        PedidoForm,
        NzButtonModule,
        NzIconModule,
        NzFlexModule,
        NzTagModule
    ],
    providers: [
        PedidoFacade,
        ClienteFacade,
        PedidoCommandFacade
    ],
}