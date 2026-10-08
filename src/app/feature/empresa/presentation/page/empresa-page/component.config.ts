import { ReactiveFormsModule } from "@angular/forms";
import { FeatureLayout } from "@core/presentation/layout/feature-layout/feature-layout";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { EmpresaFacade } from "../../../application/facade/empresa.facade";
import { EmpresaCommandFacade } from "../../../application/facade/empresa-command.facade";

export default {
    imports: [
        FeatureLayout,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzAlertModule,
        NzSpinModule
    ],
    providers: [
        EmpresaFacade,
        EmpresaCommandFacade
    ]
}
