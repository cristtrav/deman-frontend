import { Injectable, computed, signal } from "@angular/core";
import { Sesion } from "../domain/model/sesion.model";

const STORAGE_KEY = 'deman.sesion';

@Injectable({ providedIn: 'root' })
export class SesionStore {
    private readonly _sesion = signal<Sesion | null>(this.cargar());
    readonly sesion = this._sesion.asReadonly();
    readonly usuario = computed(() => this._sesion()?.usuario ?? null);
    readonly autenticado = computed(() => this._sesion() != null);
    // Las sesiones guardadas antes de existir el permiso no lo traen: se actualiza al renovar el token
    readonly esAdmin = computed(() => this._sesion()?.usuario.isAdmin === true);

    iniciar(sesion: Sesion) {
        this._sesion.set(sesion);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion)); } catch { }
    }

    cerrar() {
        this._sesion.set(null);
        try { localStorage.removeItem(STORAGE_KEY); } catch { }
    }

    // La sesión se puede seguir usando mientras el refresh token no haya expirado
    // (la renovación del access token se agregará junto con la autorización de las peticiones)
    vigente(): boolean {
        const sesion = this._sesion();
        return sesion != null && sesion.refreshExpiraEn > Date.now();
    }

    private cargar(): Sesion | null {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const sesion = raw ? JSON.parse(raw) as Sesion : null;
            if (sesion == null || !(sesion.refreshExpiraEn > Date.now())) return null;
            return sesion;
        } catch {
            return null;
        }
    }
}
