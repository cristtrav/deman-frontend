import { Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

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

}
