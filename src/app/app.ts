import { Component, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NombreEmpresaFacade } from './feature/empresa/application/facade/nombre-empresa.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzBreadCrumbModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('deman-frontend');
  private readonly nombreEmpresaFacade = inject(NombreEmpresaFacade);
  private readonly titleService = inject(Title);

  constructor() {
    // El título de la pestaña sigue al nombre de la empresa registrada
    effect(() => this.titleService.setTitle(this.nombreEmpresaFacade.nombre()));
  }
}
