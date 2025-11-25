import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import icons from './icons';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FormsModule } from '@angular/forms';
import { ToolbarButton } from '@core/presentation/model/toolbar-button.model';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'core-feature-layout',
  imports: [
    NzTypographyModule,
    NzFlexModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzDividerModule,
    NzBreadCrumbModule,
    NzGridModule,
    FormsModule,
    NzFormModule
],
  providers: [provideNzIconsPatch(icons)],
  templateUrl: './feature-layout.html',
  styleUrl: './feature-layout.scss'
})
export class FeatureLayout {

  @Input()
  title!: string;
  @Input()
  subtitle!: string;
  @Input()
  toolbarButtons!: ToolbarButton[]
  @Input()
  type: 'default' | 'master-detail' = 'default';
  @Input()
  bagroundType: 'color' | 'transparent' = 'color';
  search: string = '';
  searchTimeoutId!: number;

  @Input()
  searchFn!: (query: string) => void;

  onSearchChange(query: string){
    clearTimeout(this.searchTimeoutId)
    this.searchTimeoutId = setTimeout(() => {
      if(this.searchFn) this.searchFn(query);
    }, 300);
  }

  resetSearch(){
    this.search = '';
    if(this.searchFn) this.searchFn(this.search);
  }

  activateToolbarAction(actionFn: Function | undefined){
    if(actionFn != null) actionFn();
  }
}
