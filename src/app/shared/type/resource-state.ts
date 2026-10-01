import { Signal } from "@angular/core";

export interface ResourceState<T>{
    value: Signal<T | undefined>;
    isLoading: Signal<boolean>;
    error: Signal<unknown>;
    reload: () => void;
}