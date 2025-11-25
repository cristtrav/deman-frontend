import { Component, OnInit } from '@angular/core';
import { FeatureLayout } from "@core/presentation/layout/feature-layout/feature-layout";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent, NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ProductoVariante } from '../../../application/model/producto-variante.model';
import { ConsultarProductoVarianteUseCase } from '../../../application/usecase/consultar-producto-variante.usecase';
import { QueryContract } from '@core/application/contract/query/query.contract';
import { finalize } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DetalleInventario } from '../../../application/model/detalle-inventario.model';
import { DecimalPipe } from '@angular/common';
import { UnidadMedidaAbrPipe } from '../../pipe/unidad-medida-abr-pipe';
import { CrearInventarioUseCase } from '../../../application/usecase/crear-inventario.usecase';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultarInventarioPorIdUseCase } from '../../../application/usecase/consultar-inventario-por-id.usecase';
import { Inventario } from '../../../application/model/inventario.model';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { EditarInventarioUseCase } from '../../../application/usecase/editar-inventario.usecase';

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
    NzModalModule,
    FormsModule,
    DecimalPipe,
    UnidadMedidaAbrPipe,
    NzSpinModule
],
  templateUrl: './detalle-inventario-page.html',
  styleUrl: './detalle-inventario-page.scss'
})
export class DetalleInventarioPage implements OnInit {

  idinventario: 'nuevo' | number = 'nuevo'
  isModalProductoVisible: boolean = false;
  isProductosVariantesLoading: boolean = false;
  isSaving: boolean = false;
  isInventarioLoading: boolean = false;
  productosVariantes: ProductoVariante[] = [];
  busquedaProducto: string = '';
  busquedaProductoTimeout: any;
  
  editIndex?: number;
  previousEditCantidadValue?: number;

  detallesInventario: DetalleInventario[] = [];

  formCabecera = new FormGroup({
    id: new FormControl<number | null>(null),
    fecha: new FormControl<Date>(new Date(), [Validators.required]),
    observacion: new FormControl<null | string>(null)
  });

  constructor(
    private consultarProuductoVarianteUseCase: ConsultarProductoVarianteUseCase,
    private crearInventarioUseCase: CrearInventarioUseCase,
    private consultarInventarioPorIdUseCase: ConsultarInventarioPorIdUseCase,
    private editarInventarioUseCase: EditarInventarioUseCase,
    private notif: NzNotificationService,
    private modal: NzModalService,
    private router: Router,
    private aroute: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.aroute.snapshot.paramMap.get('id');
    if(id != null && Number.isInteger(Number(id))) this.idinventario = Number(id);
    else this.idinventario = 'nuevo';

    if(Number.isInteger(this.idinventario)) this.loadInventario(this.idinventario as number)
    this.updateFormValidators()
  }

  loadInventario(id: number){
    this.isInventarioLoading = true;
    this.consultarInventarioPorIdUseCase.execute(id)
    .pipe(finalize(() => this.isInventarioLoading = false))
    .subscribe({
      next: inventario => this.loadInventarioData(inventario),
      error: e => {
        console.error(`Error al cargar inventario con Código «${id}»`, e);
        this.notif.error('Error al cargar inventario', e.message);
      }
    })
  }

  private loadInventarioData(inventario: Inventario){
    this.formCabecera.controls.id.setValue(inventario.id);
    this.formCabecera.controls.fecha.setValue(inventario.fecha);
    this.formCabecera.controls.observacion.setValue(inventario.observacion ?? null)
    this.detallesInventario = inventario.detalles;
  }

  private updateFormValidators(){
    this.formCabecera.controls.id.clearValidators();
    if(this.idinventario != 'nuevo') this.formCabecera.controls.id.addValidators(Validators.required);
  }

  closeModalProductos(){
    this.isModalProductoVisible = false;
  }

  openModalProductos(){
    this.isModalProductoVisible = true;
    this.loadProductosVariantes();
  }

  loadProductosVariantes(){
    const query: QueryContract = {
      search: this.busquedaProducto ? {
        fields: ['producto.descripcion'],
        q: this.busquedaProducto
      } : undefined
    };
    this.isProductosVariantesLoading = true;
    this.consultarProuductoVarianteUseCase.execute(query)
    .pipe(finalize(() => this.isProductosVariantesLoading = false))
    .subscribe({
      next: result => this.productosVariantes = result.data,
      error: e => {
        console.error('Error al consultar productos-variantes', e);
        this.notif.error('Error al cargar Productos-Variantes', e.message)
      }
    })
  }

  searchProductosVariantes(){
    clearTimeout(this.busquedaProductoTimeout)
    this.busquedaProductoTimeout = setTimeout(() => {
        this.loadProductosVariantes();    
      }, 300
    );
  }

  addDetalle(pv: ProductoVariante){
    this.detallesInventario = this.detallesInventario.concat({
      id: -1,
      cantidad: 1.0,
      diferencia: 0.0,
      producto: pv.producto,
      variante: pv.variante
    })
  }

  confirmRemoveDetalle(index: number, detalle: DetalleInventario){
    this.modal.confirm({
      nzTitle: '¿Desea quitar el detalle de inventario?',
      nzContent: `${detalle.producto.descripcion} - ${detalle.cantidad} ${detalle.producto.unidadMedida.abreviatura.singular}`,
      nzOkText: 'Quitar',
      nzOkDanger: true,
      nzOnOk: () => this.removeDetalle(index, detalle)
    })
  }

  private removeDetalle(index: number, detalle: DetalleInventario){
    this.detallesInventario = this.detallesInventario.filter((detalle, idx) => index != idx)
    //this.notif.success('Éxito', `Se quitó el produto «${detalle.producto.descripcion}»`);
  }

  save(){
    Object.keys(this.formCabecera.controls).forEach(ctrlName => {
      this.formCabecera.get(ctrlName)?.markAsDirty();
      this.formCabecera.get(ctrlName)?.updateValueAndValidity();
    });
    if(this.detallesInventario.length == 0) this.notif.error('Error de validación','No se agregaron productos');
    if(this.detallesInventario.length == 0 || !this.formCabecera.valid) return;
    
    if(this.idinventario == 'nuevo') this.create();
    else this.edit();
  }

  create(){
    this.isSaving = true;
    this.crearInventarioUseCase.execute({data: {
      fecha: this.formCabecera.controls.fecha.value ?? new Date(),
      observacion: this.formCabecera.controls.observacion.value ?? undefined,
      detalles: this.detallesInventario.map(detalle => ({
        cantidad: detalle.cantidad,
        producto: detalle.producto,
        variante: detalle.variante
      }))
    }})
    .pipe(finalize(() => this.isSaving = false))
    .subscribe({
      next: inventario => {
        this.idinventario = inventario.id;
        this.formCabecera.controls.id.setValue(inventario.id);
        this.router.navigate(['inventarios', inventario.id], {relativeTo: this.aroute.parent})
        this.notif.success('Éxito', `Inventario creado con código «${inventario.id}»`)
      },
      error: e => {
        console.error('Error al crear Inventario', e);
        this.notif.error('Error al crear Inventario', e.error.message);
      }
    })
  }

  edit(){
    this.isSaving = true;
    this.editarInventarioUseCase.execute({
      data: {
        id: this.formCabecera.controls.id.value ?? -1,
        fecha: this.formCabecera.controls.fecha.value ?? new Date(),
        observacion: this.formCabecera.controls.observacion.value ?? undefined,
        detalles: this.detallesInventario.map(d => ({
          id: d.id,
          cantidad: d.cantidad,
          producto: d.producto,
          variante: d.variante,
        }))
      }
    }).pipe(finalize(() => this.isSaving = false))
    .subscribe({
      next: inventario => this.notif.success('Éxito', 'Inventario editado'),
      error: e => {
        console.error('Error al editar inventario', e);
        this.notif.error('Error al editar inventario', e.message);
      }
    })
  }

  startEdit(index: number, input: NzInputNumberComponent){
    this.editIndex = index;
    this.previousEditCantidadValue = this.detallesInventario[index].cantidad;
    setTimeout(() => input.focus(), 200);
  }

  cancelEdit(){
    this.detallesInventario.find((d, idx) => {
      if(idx == this.editIndex) d.cantidad = this.previousEditCantidadValue ?? 0;
      return d;
    })
    this.previousEditCantidadValue = undefined;
    this.editIndex = undefined;
  }

  finishEdit(){
    this.editIndex = undefined;
    this.previousEditCantidadValue = undefined;
  }

}
