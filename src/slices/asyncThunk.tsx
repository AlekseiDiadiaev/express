import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll } from "../api/dataApi";


export const productsFetched = createAsyncThunk(
    'PRODUCTS_FETCHED', async () => {
        const response = await getAll();
        if (Array.isArray(response)) {
            return response.map(item => {
                const {id, title, price, description,category, image, rating} = item;
                return {
                    id,
                    title,
                    price,
                    description,
                    category,
                    image,
                    rate: rating.rate
                }
            });
        } else {
            return null;
        }
    })

    // export const singleProductFetched = createAsyncThunk(
    //     'SINGLE_PRODUCT_FETCHED', async (payload: number) => {
    //         const response = await getSingleProduct(payload);
    //         if (Array.isArray(response)) {
    //             return response.map(item => {
    //                 const {id, title, price, description,category, image, rating} = item;
    //                 return {
    //                     id,
    //                     title,
    //                     price,
    //                     description,
    //                     category,
    //                     image,
    //                     rate: rating.rate
    //                 }
    //             });
    //         } else {
    //             return null;
    //         }
    //     })    