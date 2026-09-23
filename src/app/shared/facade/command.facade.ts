import { HttpClient } from "@angular/common/http";
import { computed, inject, signal } from "@angular/core";
import { ApiResponse } from "@shared/pagination/api-response.model";

export abstract class CommandFacade<ItemType, NewType, EditType>{
    readonly isSaving = computed(() => this.status() == 'saving');
    readonly message = signal<string>('');
    readonly error = signal<string | null>(null);
    readonly savedItem = signal<ItemType | null>(null);
    readonly status = signal<'initial' | 'saving' | 'success' | 'error'>('initial');
    readonly dataChange = signal<number>(0);
    readonly deletedId = signal<number | null>(null);
    private readonly http = inject(HttpClient);

    constructor(
        private readonly baseUrl: string,
    ){ }

    crear(newItem: NewType){
        this.status.set('saving');
        this.http.post<ApiResponse<ItemType>>(this.baseUrl, newItem)
        .subscribe({
            next: (resp) => {
                this.status.set('success');
                this.message.set(resp.message ?? '');
                this.error.set(null);
                this.savedItem.set(resp.data);
                this.dataChange.update(n => n + 1);
            },
            error: (err) => {
                this.error.set(err.error);
                this.message.set('');
                this.savedItem.set(null);
                this.status.set('error');                
            }
        });
    }

    editar(id: number, pedido: EditType){
        this.status.set('saving');
        this.http.put<ApiResponse<ItemType>>(`${this.baseUrl}/${id}`, pedido)
        .subscribe({
            next: (resp) => {
                this.status.set('success');
                this.message.set(resp.message ?? '');
                this.error.set(null);
                this.savedItem.set(resp.data);
                this.dataChange.update(n => n + 1);
            },
            error: (err) => {
                this.error.set(err.error);
                this.message.set('');
                this.savedItem.set(null);
                this.status.set('error');
            }
        });
    }

    eliminar(id: number){
        this.status.set('saving');
        this.http.delete<ApiResponse<ItemType>>(`${this.baseUrl}/${id}`)
        .subscribe({
            next: (resp) => {
                this.status.set('success');
                this.message.set(resp.message ?? '');
                this.error.set(null);
                this.savedItem.set(resp.data);
                this.dataChange.update(n => n + 1);
                this.deletedId.set(id);
            },
            error: (err) => {
                this.error.set(err.error);
                this.message.set('');
                this.savedItem.set(null);
                this.status.set('error');
            }
        });
    }
}