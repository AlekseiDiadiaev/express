import { SortFileds } from "./constatns";

export interface IProductsData {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rate: number;
}

export interface IFilter {
    field: SortFileds
    direction: 1 | -1;
}