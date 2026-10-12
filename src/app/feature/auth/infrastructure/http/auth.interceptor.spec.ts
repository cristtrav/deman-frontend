import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { environment } from '@environment/environment';
import { authInterceptor } from './auth.interceptor';
import { SesionStore } from '../../application/sesion.store';
import { Sesion } from '../../domain/model/sesion.model';

describe('authInterceptor', () => {
    const API = environment.apiURL;
    let http: HttpClient;
    let httpMock: HttpTestingController;
    let sesionStore: SesionStore;
    let router: Router;

    const sesion = (accessToken: string, accessExpiraEn = Date.now() + 600_000): Sesion => ({
        accessToken,
        refreshToken: 'refresh',
        tokenType: 'Bearer',
        accessExpiraEn,
        refreshExpiraEn: Date.now() + 86_400_000,
        usuario: { id: 1, nombres: 'Juan', apellidos: 'Pérez', ci: '1234567' }
    });

    const sesionDto = (accessToken: string) => ({
        success: true,
        data: {
            accessToken,
            refreshToken: 'refresh2',
            tokenType: 'Bearer',
            expiresIn: 900,
            usuario: { id: 1, nombres: 'Juan', apellidos: 'Pérez', ci: '1234567' }
        }
    });

    const error401 = (code: string) => ({ success: false, message: 'x', error: { code, statusCode: 401 } });

    beforeEach(() => {
        localStorage.clear();
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([authInterceptor])),
                provideHttpClientTesting(),
                provideRouter([])
            ]
        });
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
        sesionStore = TestBed.inject(SesionStore);
        router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.resolveTo(true);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('agrega el access token a las peticiones al backend', () => {
        sesionStore.iniciar(sesion('access1'));

        http.get(`${API}/marcas`).subscribe();

        expect(httpMock.expectOne(`${API}/marcas`).request.headers.get('Authorization')).toBe('Bearer access1');
    });

    it('no agrega el token a login ni a otros servidores', () => {
        sesionStore.iniciar(sesion('access1'));

        http.post(`${API}/auth/login`, {}).subscribe();
        http.get('https://otro.servidor/datos').subscribe();

        expect(httpMock.expectOne(`${API}/auth/login`).request.headers.has('Authorization')).toBeFalse();
        expect(httpMock.expectOne('https://otro.servidor/datos').request.headers.has('Authorization')).toBeFalse();
    });

    it('renueva el token antes de enviar si está por expirar, con una sola llamada para varias peticiones', () => {
        sesionStore.iniciar(sesion('vencido', Date.now() + 1_000));

        http.get(`${API}/marcas`).subscribe();
        http.get(`${API}/colores`).subscribe();

        const refresh = httpMock.expectOne(`${API}/auth/refresh`);
        expect(refresh.request.body).toEqual({ refreshToken: 'refresh' });
        refresh.flush(sesionDto('access2'));

        expect(httpMock.expectOne(`${API}/marcas`).request.headers.get('Authorization')).toBe('Bearer access2');
        expect(httpMock.expectOne(`${API}/colores`).request.headers.get('Authorization')).toBe('Bearer access2');
        expect(sesionStore.sesion()?.refreshToken).toBe('refresh2');
    });

    it('ante INVALID_TOKEN renueva y reintenta una vez', () => {
        sesionStore.iniciar(sesion('access1'));
        let respuesta: unknown;

        http.get(`${API}/marcas`).subscribe(r => respuesta = r);
        httpMock.expectOne(`${API}/marcas`).flush(error401('INVALID_TOKEN'), { status: 401, statusText: 'Unauthorized' });
        httpMock.expectOne(`${API}/auth/refresh`).flush(sesionDto('access2'));
        const reintento = httpMock.expectOne(`${API}/marcas`);
        expect(reintento.request.headers.get('Authorization')).toBe('Bearer access2');
        reintento.flush({ success: true, data: [] });

        expect(respuesta).toEqual({ success: true, data: [] });
    });

    it('cierra la sesión y envía al login si el refresh es rechazado', () => {
        sesionStore.iniciar(sesion('access1'));
        let error: unknown;

        http.get(`${API}/marcas`).subscribe({ error: e => error = e });
        httpMock.expectOne(`${API}/marcas`).flush(error401('INVALID_TOKEN'), { status: 401, statusText: 'Unauthorized' });
        httpMock.expectOne(`${API}/auth/refresh`).flush(error401('INVALID_TOKEN'), { status: 401, statusText: 'Unauthorized' });

        expect(error).toBeDefined();
        expect(sesionStore.sesion()).toBeNull();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect((router.navigate as jasmine.Spy).calls.mostRecent().args[0]).toEqual(['/login']);
    });

    it('conserva la sesión si el refresh falla por un error de red', () => {
        sesionStore.iniciar(sesion('vencido', Date.now() + 1_000));

        http.get(`${API}/marcas`).subscribe({ error: () => undefined });
        httpMock.expectOne(`${API}/auth/refresh`).error(new ProgressEvent('error'), { status: 0 });

        expect(sesionStore.sesion()).not.toBeNull();
        expect(router.navigate).not.toHaveBeenCalled();
    });

    it('envía al login si el backend responde MISSING_TOKEN', () => {
        http.get(`${API}/marcas`).subscribe({ error: () => undefined });
        httpMock.expectOne(`${API}/marcas`).flush(error401('MISSING_TOKEN'), { status: 401, statusText: 'Unauthorized' });

        expect(router.navigate).toHaveBeenCalled();
    });
});
