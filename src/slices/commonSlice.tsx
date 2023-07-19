import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import { Theme, Categories, SortFileds } from '../constatns';
import { productsFetched } from '../slices/asyncThunk'
import { IFilter, IProductsData } from '../interfaces';

interface IState {
    theme: Theme;
    productsData: IProductsData[] | [] | null;
    selectedCat: Categories;
    filter: IFilter;
    loading: boolean;
    error: boolean;
}


const initialState: IState = {
    theme: Theme.Light,
    productsData: null,
    selectedCat: Categories.All,
    filter: {
        field: SortFileds.Rate,
        direction: 1,
    },
    loading: false,
    error: false,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setTheme(state, { payload }: { payload: Theme }) {
            state.theme = payload;
        },
        setProductsData(state, { payload }: { payload: IProductsData[] | null}) {
            state.productsData = payload;
        },
        selectCat(state, { payload }: { payload: Categories }) {
            state.selectedCat = payload;
        },
        selectFilter(state, { payload }: { payload: IFilter }) {
            state.filter = payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(productsFetched.fulfilled, (state, { payload }: { payload: IProductsData[] | null}) => {
            state.productsData = payload;
            state.error = false;
            state.loading = false;
        })
        .addCase(productsFetched.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(productsFetched.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
        .addDefaultCase(() => { })
    }
})

export default commonSlice.reducer

export const {
    setTheme,
    setProductsData,
    selectCat,
    selectFilter
} = commonSlice.actions;
