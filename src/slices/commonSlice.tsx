import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import { Theme, Categories, SortFileds } from '../constatns';
import { productsFetched } from '../slices/asyncThunk'
import { IProductData } from '../interfaces';

interface IState {
    theme: Theme;
    productsData: IProductData[] | [] | null;
    selectedCat: Categories;
    filter: SortFileds;
    loading: boolean;
    error: boolean;
    cartIsOpen: boolean;
    cartTrigger: boolean;
    modalIsOpen: boolean;
}


const initialState: IState = {
    theme: Theme.Light,
    productsData: null,
    selectedCat: Categories.All,
    filter: SortFileds.RateLow,
    loading: false,
    error: false,
    cartIsOpen: false,
    cartTrigger: false,
    modalIsOpen: false,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setTheme(state, { payload }: { payload: Theme }) {
            state.theme = payload;
        },
        setProductsData(state, { payload }: { payload: IProductData[] | null}) {
            state.productsData = payload;
        },
        selectCat(state, { payload }: { payload: Categories }) {
            state.selectedCat = payload;
        },
        selectFilter(state, { payload }: { payload: SortFileds }) {
            state.filter = payload;
        },
        setCartIsOpen(state, { payload }: { payload?: boolean}) {
            if(typeof payload === 'boolean') {
                state.cartIsOpen = payload;
            }  else {
                state.cartIsOpen = !state.cartIsOpen;
            }
        },
        changeCartTrigger(state) {
            state.cartTrigger = !state.cartTrigger;
        },
        setModalIsOpen(state, { payload }: { payload: boolean}) {
            state.modalIsOpen = payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(productsFetched.fulfilled, (state, { payload }: { payload: IProductData[] | null}) => {
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
    selectFilter,
    setCartIsOpen,
    changeCartTrigger,
    setModalIsOpen
} = commonSlice.actions;
