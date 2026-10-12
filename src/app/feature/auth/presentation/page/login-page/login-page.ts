import { Component, effect, viewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzAlertUtil } from '@core/presentation/util/nz-alert.util';
import componentConfig from './component.config';
import { LoginFacade } from '../../../application/facade/login.facade';

const RUTA_INICIO = '/app/dashboard';

@Component({
  selector: 'login-page',
  imports: componentConfig.imports,
  providers: componentConfig.providers,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  readonly alertView = viewChild.required('alert', { read: ViewContainerRef });
  passwordVisible = false;

  form = new FormGroup({
    ci: new FormControl<string | null>(null, [Validators.required, Validators.pattern(/\S/), Validators.maxLength(20)]),
    // bcrypt solo considera los primeros 72 bytes
    password: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(72)])
  });

  constructor(
    public readonly loginFacade: LoginFacade,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    effect(() => {
      const status = this.loginFacade.status();
      if (status == 'initial' || status == 'saving') {
        this.alertView().clear();
      } else if (status == 'success') {
        this.router.navigateByUrl(this.returnUrl());
      } else {
        NzAlertUtil.showErrorAlert(this.alertView(), 'No se pudo iniciar sesión', this.loginFacade.error() ?? '');
      }
    });
  }

  login() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsDirty();
      this.form.get(key)?.updateValueAndValidity();
    });
    if (!this.form.valid || this.loginFacade.isSaving()) return;
    this.loginFacade.login(
      this.form.controls.ci.value?.trim() ?? '',
      this.form.controls.password.value ?? ''
    );
  }

  // Solo rutas internas: evita redirecciones a otros sitios
  private returnUrl(): string {
    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    return url && url.startsWith('/') && !url.startsWith('//') ? url : RUTA_INICIO;
  }
}
