import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SesionStore } from "../../application/sesion.store";

export const authGuard: CanActivateFn = (_route, state) => {
    const sesionStore = inject(SesionStore);
    if (sesionStore.vigente()) return true;
    sesionStore.cerrar();
    return inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
}

// Evita mostrar el login a quien ya tiene una sesión vigente
export const guestGuard: CanActivateFn = () =>
    inject(SesionStore).vigente() ? inject(Router).createUrlTree(['/app/dashboard']) : true;
