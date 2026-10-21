import { Component, computed, inject } from '@angular/core';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import icons from './icons';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Router, RouterModule } from '@angular/router';
import { Breadcrumb } from "../../component/breadcrumb/breadcrumb";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SesionStore } from '../../../../feature/auth/application/sesion.store';
import { NombreEmpresaFacade } from '../../../../feature/empresa/application/facade/nombre-empresa.facade';

@Component({
  selector: 'core-main-layout',
  imports: [
    NzIconModule,
    NzLayoutModule,
    NzFlexModule,
    NzMenuModule,
    NzDropDownModule,
    RouterModule,
    Breadcrumb
],
  providers: [provideNzIconsPatch(icons)],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {
  isCollapsed = false;
  protected readonly date = new Date();
  protected readonly nombreUsuario = computed(() => {
    const usuario = this.sesionStore.usuario();
    return usuario ? `${usuario.nombres} ${usuario.apellidos}` : '';
  });

  protected readonly esAdmin = inject(SesionStore).esAdmin;
  protected readonly nombreEmpresa = inject(NombreEmpresaFacade).nombre;
  // Con el menú colapsado solo entran las iniciales: "Deman Store" → "DS"
  protected readonly inicialesEmpresa = computed(() =>
    this.nombreEmpresa().split(/\s+/).filter(p => p.length > 0).slice(0, 2).map(p => p[0].toUpperCase()).join('')
  );

  constructor(
    private readonly sesionStore: SesionStore,
    private readonly router: Router
  ) { }

  cerrarSesion() {
    this.sesionStore.cerrar();
    this.router.navigate(['/login']);
  }
}
