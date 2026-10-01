import { HttpResourceRef, httpResource } from "@angular/common/http";
import { Signal, computed, signal } from "@angular/core";
import { PageRequest } from "@shared/type/page-request";
import { PaginatedResponse } from "@shared/pagination/paginated-response.model";
import { Sort } from "@shared/type/sort";

export abstract class BaseFacade<T> {
    readonly page = signal<number>(1);
    readonly pageSize = signal<number>(10);
    readonly sortField = signal<string | undefined>(undefined);
    readonly sortDirection = signal<"asc" | "desc">("asc");    
    readonly totalItems = computed(() => this.resource.value().pagination.total);
    readonly sort: Signal<Sort | undefined> = computed(() => {
        const field = this.sortField();
        const direction = this.sortDirection();
        if(field == null) return undefined;
        return { field, direction }
    })
    
    readonly emptyPage: PaginatedResponse<T> = { data: [], pagination: { page: 0, pageSize: 0, total: 0, totalPages: 0 } };
    readonly pageRequest: Signal<PageRequest> = computed(() => {
        const sort = this.sort();
        const page = this.page();
        const size = this.pageSize();
        return { sort, page, size }
    });
    
    readonly resource: HttpResourceRef<PaginatedResponse<T>> = httpResource(
        () => { 
            const pagReq = this.pageRequest();
            return {
                url: this.baseUrl,
                params: {
                    page: pagReq.page,
                    size: pagReq.size,
                    ...(pagReq.sort ? { sort: pagReq.sort.field, sortOrder: pagReq.sort.direction } : {})
                }
            } 
        },
        { defaultValue: this.emptyPage }
    );
    readonly itemList = computed(() => this.resource.value().data);
    readonly loading = this.resource.isLoading;
    readonly error = this.resource.error;

    

    constructor(
        private readonly baseUrl: string
    ) { }

    reload() { this.resource.reload(); }
}