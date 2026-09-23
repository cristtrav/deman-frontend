import { HttpResourceRef, httpResource } from "@angular/common/http";
import { Signal, computed, signal } from "@angular/core";
import { PageRequest } from "@shared/pagination/page-request.model";
import { PaginatedResponse } from "@shared/pagination/paginated-response.model";

export abstract class BaseFacade<T> {
    readonly emptyPage: PaginatedResponse<T> = { data: [], pagination: { page: 0, pageSize: 0, total: 0, totalPages: 0 } };
    readonly pageRequest: Signal<PageRequest> = computed(() => {
        return {
            sort: this.sort(),
            sortOrder: this.sortOrder(),
            page: this.page(),
            size: this.pageSize()
        }
    });
    
    readonly resource: HttpResourceRef<PaginatedResponse<T>> = httpResource(
        () => { 
            const pagReq = this.pageRequest();
            return {
                url: this.baseUrl,
                params: {
                    page: pagReq.page,
                    size: pagReq.size,
                    ...(pagReq.sort ? { sort: pagReq.sort, sortOrder: pagReq.sortOrder } : {})
                }
            } 
        },
        { defaultValue: this.emptyPage }
    );
    readonly itemList = computed(() => this.resource.value().data);
    readonly loading = this.resource.isLoading;
    readonly error = this.resource.error;

    readonly page = signal<number>(1);
    readonly pageSize = signal<number>(10);
    readonly sort = signal<string | undefined>(undefined);
    readonly sortOrder = signal<"asc" | "desc">("asc");
    readonly totalItems = computed(() => this.resource.value().pagination.total);

    constructor(
        private readonly baseUrl: string
    ) { }

    reload() { this.resource.reload(); }
}