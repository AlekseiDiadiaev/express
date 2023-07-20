import { cloneDeep } from "lodash";
import { SortFileds } from "../constatns";
import { IProductData } from "../interfaces";

export function sortProducts(data: IProductData[], marker: SortFileds = SortFileds.RateLow): IProductData[] {
    const newData: IProductData[] = cloneDeep(data)
    const field = marker.slice(0, -2) as keyof IProductData;
    const direction = marker.slice(-2)
    return newData.sort((a, b) => {
        if (a[field] < b[field]) return -+direction;
        if (a[field] > b[field]) return +direction;
        return 0;
    })
}