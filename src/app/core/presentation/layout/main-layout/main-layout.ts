import { Component } from '@angular/core';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import icons from './icons';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from "../../component/breadcrumb/breadcrumb";
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'core-main-layout',
  imports: [
    NzIconModule,
    NzLayoutModule,
    NzFlexModule,
    NzMenuModule,
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
}
