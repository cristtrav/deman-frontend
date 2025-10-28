import { Component } from '@angular/core';
import { FeatureLayout } from "@core/presentation/layout/feature-layout/feature-layout";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormDirective, NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProductoVariante } from '../../../application/model/producto-variante.model';

@Component({
  selector: 'app-detalle-inventario-page',
  imports: [
    FeatureLayout,
    NzGridModule,
    NzTableModule,
    NzFlexModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzModalModule
],
  templateUrl: './detalle-inventario-page.html',
  styleUrl: './detalle-inventario-page.scss'
})
export class DetalleInventarioPage {

  idinventario: string = 'nuevo'
  isModalProductoVisible: boolean = false;
  isProductosVariantesLoading: boolean = false;
  productosVariantes: ProductoVariante[] = []

  cerrarModalProductos(){
    this.isModalProductoVisible = false;
  }

  abrirModalProductos(){
    this.isModalProductoVisible = true;
  }

}
