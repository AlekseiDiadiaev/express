import { SortFileds } from "../constatns";
import { IProductsData } from "../interfaces";

export function sortProducts(data: IProductsData[], field: SortFileds = SortFileds.Rate, direction: 1 | -1 = 1): IProductsData[] {
    return data.sort((a, b) => {
        if (a[field] < b[field]) return -direction;
        if (a[field] > b[field]) return direction;
        return 0;
    })
}