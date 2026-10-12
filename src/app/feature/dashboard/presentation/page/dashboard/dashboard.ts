import { Component, computed, inject } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SesionStore } from '../../../../auth/application/sesion.store';

@Component({
  selector: 'app-dashboard',
  imports: [    
    NzCardComponent,
    NzFlexModule,
    NzTypographyModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private readonly sesionStore = inject(SesionStore);

  protected readonly nombreUsuario = computed(() => this.sesionStore.usuario()?.nombres ?? '');
}
