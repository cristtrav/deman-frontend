import { Sort } from "./sort";

export interface PageRequest {
  page: number;
  size: number;
  sort?: Sort;
}