import { Component } from '@angular/core';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons'
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { InnerContent } from "../../component/inner-content/inner-content";
import { RouterModule } from '@angular/router';
import { Breadcrumb } from "../../component/breadcrumb/breadcrumb";
import { MainMenu } from "../../component/main-menu/main-menu";

@Component({
  selector: 'core-main-layout',
  imports: [
    NzIconModule,
    NzLayoutModule,
    NzFlexModule,
    InnerContent,
    RouterModule,
    Breadcrumb,
    MainMenu
],
  providers: [provideNzIconsPatch([MenuFoldOutline, MenuUnfoldOutline])],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {
  isCollapsed = false;
  protected readonly date = new Date();
}
