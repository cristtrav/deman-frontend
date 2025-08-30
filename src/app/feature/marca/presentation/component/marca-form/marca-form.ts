import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { Marca } from '../../../application/model/marca.model';
import { CrearMarcaUseCase } from '../../../application/usecase/crear-marca.usecase';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs';
import { NzAlertComponent, NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditarMarcaUseCase } from '../../../application/usecase/editar-marca.usecase';

@Component({
  selector: 'marca-form',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzAlertModule,
    NzButtonComponent,    
    NzIconModule
],
  templateUrl: './marca-form.html',
  styleUrl: './marca-form.scss'
})
export class MarcaForm implements OnInit {

  private _mode: 'add' | 'edit' = 'add';
  private _isSaving: boolean = false;

  private _idMode: 'auto' | 'manual' = 'auto';

  @ViewChild('notification', {read: ViewContainerRef})
  notifContainer!: ViewContainerRef;

  @Input()
  set mode(m: 'add' | 'edit'){
    this._mode = m;
    if(m == 'edit') this.idMode = 'manual';
    this.modeChange.emit(m);
  }
  get mode(): 'add' | 'edit'{ return this._mode }
  
  @Input()
  editingMarca?: Marca;

  @Output()
  savedMarca = new EventEmitter<Marca>();
  @Output()
  isSavingChange = new EventEmitter<boolean>();
  @Output()
  modeChange = new EventEmitter<'add' | 'edit'>();
  
  get isSaving(): boolean { return this._isSaving }
  set isSaving(value: boolean){
    this._isSaving = value;
    this.isSavingChange.emit(value);
  }

  get idMode(): 'auto' | 'manual'{ return this._idMode }
  set idMode(m: 'auto' | 'manual'){
    this._idMode = m;
    if(m == 'auto'){
      this.form.controls.id.reset();
      this.form.controls.id.clearValidators();
    }else{
      this.form.controls.id.addValidators(Validators.required)
    }
  }

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    descripcion: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)])
  })

  constructor(
    readonly crearMarcasUseCase: CrearMarcaUseCase,
    readonly editarMarcasUseCase: EditarMarcaUseCase
  ){ }

  ngOnInit(): void {
    if(this.mode == 'edit' && this.editingMarca)
      this.loadFormData(this.editingMarca);
  }

  save(){
    Object.keys(this.form.controls)
      .forEach(ctrl => {
        this.form.get(ctrl)?.markAsDirty();
        this.form.get(ctrl)?.updateValueAndValidity();
      })
    if(!this.form.valid) return;
    if(this.mode == 'add') this.create();
    else this.edit();
  }

  private create(){
    this.isSaving = true;
    this.crearMarcasUseCase.execute({data: {
      id: this.form.controls.id.value ?? undefined,
      descripcion: this.form.controls.descripcion.value ?? ''
    }})
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe({
      next: savedMarca => {
        this.showSuccessAlert('Marca creada');
        this.savedMarca.emit();
        this.editingMarca = savedMarca;
        this.loadFormData(savedMarca);
        this.mode = 'edit';
      },
      error: e => {
        console.error('Error al crear marca', e);
        this.showErrorAlert('Error al crear marca', e.message);
      }
    });
  }

  private edit(){
    this.isSaving = true;
    this.editarMarcasUseCase.execute({
      previousId: this.editingMarca?.id ?? -1,
      data: {
        id: this.form.controls.id.value ?? -1,
        descripcion: this.form.controls.descripcion.value ?? ''
      }
    }).pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe({
      next: (savedMarca) => {
        this.showSuccessAlert('Marca editada');
        this.loadFormData(savedMarca);
        this.savedMarca.emit(savedMarca)
        this.editingMarca = savedMarca
      },
      error: (e) => {
        console.error(e);
        this.showErrorAlert('Error al editar marca', e.message);        
      }
    })
  }

  private loadFormData(marca: Marca){
    this.form.controls.id.setValue(marca.id);
    this.form.controls.descripcion.setValue(marca.descripcion);
  }

  private showSuccessAlert(message: string, description?: string){
    this.showAlert('success', message, description);
  }

  private showErrorAlert(message: string, description?: string){
    this.showAlert('error', message, description);
  }

  private showAlert(type: 'success' | 'error', message: string, description?: string){
    this.notifContainer.clear();
    const alert = this.notifContainer.createComponent(NzAlertComponent);
    alert.instance.nzType = type;
    alert.instance.nzShowIcon = true;
    alert.instance.nzMessage = message;
    alert.instance.nzDescription = description ?? '';
    alert.instance.nzCloseable = true;
  }

  resetForm(){
    this.notifContainer.clear();
    this.idMode = 'auto';
    this.mode = 'add';
    this.form.reset();
  }

  switchIdMode(){
    this.idMode = this.idMode == 'auto' ? 'manual' : 'auto';
  }
}
