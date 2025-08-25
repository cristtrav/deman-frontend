import { Component } from '@angular/core';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HomeOutline, TeamOutline, UserOutline } from '@ant-design/icons-angular/icons'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'core-main-menu',
  imports: [NzIconModule, NzMenuModule, RouterLink],
  providers: [provideNzIconsPatch([HomeOutline, TeamOutline, UserOutline])],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss'
})
export class MainMenu {

}
