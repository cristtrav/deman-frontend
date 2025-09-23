import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzInputDirective, NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from "ng-zorro-antd/select";
import { Marca } from '../../../application/model/marca.model';
import { ConsultarMarcasUseCase } from '../../../application/usecase/consultar-marcas.usecase';
import { QueryContract } from '@core/application/contract/query/query.contract';
import { finalize } from 'rxjs';
import { NzAlertUtil } from '@core/presentation/util/nz-alert.util';
import { Categoria } from '../../../application/model/categoria.model';
import { ConsultarCategoriasUseCase } from '../../../application/usecase/consultar-categorias.usecase';
import { ConsultarTiposUseCase } from '../../../application/usecase/consultar-tipos.usecase ';
import { Tipo } from '../../../application/model/tipo.model';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultarUnidadesMedidasUseCase } from '../../../application/usecase/consultar-unidades-medidas.usecase';
import { UnidadMedida } from '../../../application/model/unidad-medida.model';
import { CrearProductoUseCase } from '../../../application/usecase/crear-producto.usecase';
import { Producto } from '../../../application/model/producto.model';
import { EditarProductoUseCase } from '../../../application/usecase/editar-producto.usecase';

@Component({
  selector: 'producto-form',
  imports: [
    NzFormModule,
    NzInputNumberModule,
    NzInputDirective,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.scss'
})
export class ProductoForm implements OnInit {

  @ViewChild('alert', {read: ViewContainerRef})
  alertContainer!: ViewContainerRef;

  _idMode: 'auto' | 'manual' = 'auto'

  private _mode: 'add' | 'edit' = 'add';

  marcas: Marca[] = [];
  loadingMarcas: boolean = false;

  categorias: Categoria[] = [];
  loadingCategorias: boolean = false;

  tipos: Tipo[] = [];
  loadingTipos: boolean = false;

  unidadesMedidas: UnidadMedida[] = [];
  loadingUnidadesMedidas: boolean = false;

  @Input()
  editingProducto?: Producto;

  @Input()
  set mode(m: 'add' | 'edit'){
    this._mode = m;
    if(m == 'edit') this.idMode = 'manual';
    this.modeChange.emit(m);
  }
  get mode(): 'add' | 'edit'{ return this._mode }

  set idMode(m: 'auto' | 'manual'){
    this._idMode = m;
    this.form.controls.id.clearValidators();
    if(m == 'manual')
      this.form.controls.id.addValidators(Validators.required)
  }
  get idMode(): 'auto' | 'manual' {
    return this._idMode;
  }

  @Output()
  modeChange = new EventEmitter<'add' | 'edit'>();
  @Output()
  isSavingChange = new EventEmitter<boolean>();
  @Output()
  savedProducto = new EventEmitter<Producto>();

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    descripcion: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(100)]),
    precio: new FormControl<number | null>(null, [Validators.required]),
    idmarca: new FormControl<number | null>(null, [Validators.required]),
    idcategoria: new FormControl<number | null>(null, [Validators.required]),
    idtipo: new FormControl<number | null>(null, [Validators.required]),
    idunidadMedida: new FormControl<string | null>(null, [Validators.required])
  })

  constructor(
    private consultarMarcasUseCase: ConsultarMarcasUseCase,
    private consultarCategoriasUseCase: ConsultarCategoriasUseCase,
    private consultarTiposUseCase: ConsultarTiposUseCase,
    private consultarUnidadesMedidasUseCase: ConsultarUnidadesMedidasUseCase,
    private crearProductoUseCase: CrearProductoUseCase,
    private editarProductoUseCase: EditarProductoUseCase
  ){}

  ngOnInit(): void {
    this.loadMarcas();
    this.loadCategorias();
    this.loadTipos();
    this.loadUnidadesMedidas();
    if(this.mode == 'edit' && this.editingProducto != null)
      this.loadFormData(this.editingProducto);
  }

  loadCategorias(){
    this.loadingCategorias = true;
    let query: QueryContract = {
      sort: {
        field: 'descripcion',
        order: 'asc'
      }
    }
    this.consultarCategoriasUseCase.execute(query)
    .pipe(finalize(() => this.loadingCategorias = false))
    .subscribe({
      next: result => this.categorias = result.data,
      error: e => {
        console.error('Error al consultar Categorias', e);
        NzAlertUtil.showErrorAlert(this.alertContainer, 'Error al consultar Categorías', e.message);
      }
    })
  }

  loadMarcas(){
    this.loadingMarcas = true;
    let query: QueryContract = {
      sort: {
        field: 'descripcion',
        order: 'asc'
      }
    }
    this.consultarMarcasUseCase.execute(query)
      .pipe(finalize(() => this.loadingMarcas = false))
      .subscribe({
        next: result => this.marcas = result.data,
        error: e => {
          console.error('Error al cargar marcas', e);
          NzAlertUtil.showErrorAlert(this.alertContainer, 'Error al cargar Marcas', e.message)
        }
      })
  }

  loadTipos(){
    const query: QueryContract = {
      sort: {
        field: 'descripcion',
        order: 'asc'
      }
    }
    this.loadingTipos = true;
    this.consultarTiposUseCase.execute(query)
    .pipe(finalize(() => this.loadingTipos = false))
    .subscribe({
      next: result => this.tipos = result.data,
      error: e => {
        console.log('Error al cargar tipos', e);
        NzAlertUtil.showErrorAlert(this.alertContainer, 'Error al cargar tipos', e.message);
      }
    })
  }

  loadUnidadesMedidas(){
    this.loadingUnidadesMedidas = true;
    this.consultarUnidadesMedidasUseCase.execute({})
    .pipe(finalize(() => this.loadingCategorias = false))
    .subscribe({
      next: result => this.unidadesMedidas = result.data,
      error: e => {
        console.error('Error al cargar unidades de medidas', e);
        NzAlertUtil.showErrorAlert(this.alertContainer, 'Error al cargar unidades de medidas', e.message);
      }
    })
  }

  switchIdMode(){
    this.idMode = this.idMode == 'auto' ? 'manual' : 'auto';
  }

  save(){
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsDirty();
      this.form.get(key)?.updateValueAndValidity();
    })
    if(!this.form.valid) return;
    if(this.mode == 'add') this.create();
    else this.edit();
  }

  loadFormData(producto: Producto){
    this.form.controls.id.setValue(producto.id);
    this.form.controls.descripcion.setValue(producto.descripcion);
    this.form.controls.precio.setValue(producto.precio);
    this.form.controls.idmarca.setValue(producto.marca.id);
    this.form.controls.idcategoria.setValue(producto.categoria.id);
    this.form.controls.idtipo.setValue(producto.tipo.id);
    this.form.controls.idunidadMedida.setValue(producto.unidadMedida.id);
  }

  private create(){
    this.isSavingChange.emit(true);
    this.crearProductoUseCase.execute({
      data: {
        id: this.form.controls.id.value ?? undefined,
        descripcion: this.form.controls.descripcion.value ?? '',
        precio: this.form.controls.precio.value ?? -1,
        idmarca: this.form.controls.idmarca.value ?? -1,
        idcategoria: this.form.controls.idcategoria.value ?? -1,
        idtipo: this.form.controls.idtipo.value ?? -1,
        idUnidadMedida: `${this.form.controls.idunidadMedida.value}`
      }
    })
    .pipe(finalize(() => this.isSavingChange.emit(false)))
    .subscribe({
      next: producto => {
        this.savedProducto.emit(producto);
        NzAlertUtil.showSuccessAlert(this.alertContainer, `Producto creado con código «${producto.id}»`)
        this.form.reset();
      },
      error: e => {
        console.error('Error al crear producto', e);
        NzAlertUtil.showErrorAlert(this.alertContainer, 'Error al registrar producto', e.message);
      }
    })
  }

  private edit(){
    this.isSavingChange.emit(true);
    this.editarProductoUseCase.execute({
      data: {
        previousId: this.editingProducto?.id ?? -1,
        id: this.form.controls.id.value ?? -1,
        descripcion: this.form.controls.descripcion.value ?? '',
        precio: this.form.controls.precio.value ?? 0,
        idmarca: this.form.controls.idmarca.value ?? -1,
        idcategoria: this.form.controls.idcategoria.value ?? -1,
        idtipo: this.form.controls.idtipo.value ?? -1,
        idunidadMedida: this.form.controls.idunidadMedida.value ?? ''
      }
    })
    .pipe(finalize(()=> this.isSavingChange.emit(false)))
    .subscribe({
      next: producto => {
        NzAlertUtil.showSuccessAlert(this.alertContainer, 'Producto editado');
        this.loadFormData(producto);
        this.savedProducto.emit(producto);
      }
    })
  }

}
