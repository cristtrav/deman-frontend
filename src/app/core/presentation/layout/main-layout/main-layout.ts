import { Component, computed } from '@angular/core';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import icons from './icons';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Router, RouterModule } from '@angular/router';
import { Breadcrumb } from "../../component/breadcrumb/breadcrumb";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SesionStore } from '../../../../feature/auth/application/sesion.store';

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

  constructor(
    private readonly sesionStore: SesionStore,
    private readonly router: Router
  ) { }

  cerrarSesion() {
    this.sesionStore.cerrar();
    this.router.navigate(['/login']);
  }
}
