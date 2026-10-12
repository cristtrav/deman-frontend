import { ReactiveFormsModule } from "@angular/forms";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { LoginFacade } from "../../../application/facade/login.facade";

export default {
    imports: [
        ReactiveFormsModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzAlertModule
    ],
    providers: [
        LoginFacade
    ]
}
