import { environment } from "@environment/environment";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { Cliente } from "../../domain/model/cliente.model";
import { PaginatedResponse } from "@shared/pagination/paginated-response.model";

// Carga los clientes por páginas, acumulándolas, para el select con lazy loading
@Injectable()
export class ClienteFacade {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiURL}/clientes`;
  private readonly pageSize = 10;
  private page = 0;
  private search = '';
  private request?: Subscription;

  readonly itemList = signal<Cliente[]>([]);
  readonly loading = signal(false);
  readonly hasMore = signal(true);
  readonly error = signal<string | null>(null);

  constructor() { this.buscar(''); }

  /** Reinicia la lista y carga la primera página que coincida con el texto */
  buscar(texto: string) {
    this.search = texto.trim();
    this.page = 0;
    this.itemList.set([]);
    this.hasMore.set(true);
    this.cargarPagina();
  }

  /** Carga la siguiente página, si hay más y no se está cargando otra */
  cargarMas() {
    if (this.loading() || !this.hasMore()) return;
    this.cargarPagina();
  }

  reload() { this.buscar(this.search); }

  private cargarPagina() {
    // Una búsqueda nueva descarta la respuesta pendiente de la anterior
    this.request?.unsubscribe();
    const page = this.page + 1;
    this.loading.set(true);
    this.request = this.http.get<PaginatedResponse<Cliente>>(this.url, {
      params: {
        page,
        pageSize: this.pageSize,
        sort: 'razonSocial',
        sortOrder: 'asc',
        ...(this.search ? { search: this.search, searchFields: 'razonSocial' } : {})
      }
    }).subscribe({
      next: (resp) => {
        this.page = page;
        this.itemList.update(lista => [
          ...lista,
          ...resp.data.filter(c => !lista.some(l => l.id == c.id))
        ]);
        this.hasMore.set(page < resp.pagination.totalPages);
        this.error.set(null);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.message ?? err.message);
        this.loading.set(false);
      }
    });
  }
}
