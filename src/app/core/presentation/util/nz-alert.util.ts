import { ViewContainerRef } from "@angular/core";
import { NzAlertComponent } from "ng-zorro-antd/alert";

export class NzAlertUtil {

    static showSuccessAlert(alertContainer: ViewContainerRef, message: string, description?: string){
        this.showAlert(alertContainer, 'success', message, description);
    }

    static showErrorAlert(alertContainer: ViewContainerRef, message: string, description?: string){
        this.showAlert(alertContainer, 'error', message, description);
    }

    static showAlert(alertContainer: ViewContainerRef, type: 'success' | 'error', message: string, description?: string){
        alertContainer.clear();
        const alert = alertContainer.createComponent(NzAlertComponent);
        alert.instance.nzType = type;
        alert.instance.nzShowIcon = true;
        alert.instance.nzMessage = message;
        alert.instance.nzDescription = description ?? '';
        alert.instance.nzCloseable = true;
    }
}