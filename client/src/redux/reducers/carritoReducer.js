import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import clienteAxios from "../../config/axios";

const initialState = {
    products: []
}

export const fetchCart = createAsyncThunk(
    'carrito/fetchCart',
    async (userId, thunkAPI) => {
        const result = await clienteAxios.get(
            `orders/users/${userId}/cart`
        );
        const data = result.data;
        return data;
        // const productsBack = data.find((x) => x.productId == products.id);
        // return productsBack;
    }
)


export const loadGuestCart = createAsyncThunk(
    'carrito/loadGuestCart',
    async (userId, thunkAPI) => {
        const productos = JSON.parse(localStorage.getItem('carritoGuest') ?? '[]');
        return productos;
    }
)
/*
addProduct(state, action) {
            //Controlar el ingreso del prodcuto al carro
            const existe = state.products.find(x => x.id == action.payload.id);
            const product = existe ? existe : { id: action.payload.id, name: action.payload.name, cantidad: 1, price: action.payload.price, img: action.payload.img }
            product.cantidad += existe ? 1 : 0;
            if (!existe) state.products.push(product)
        },
*/

export const addProduct = createAsyncThunk(
    'carrito/addProduct',
    async ({ userId, product, cantidadActual }, thunkAPI) => {
        if (userId > 0) {
            const result = await clienteAxios.get(
                `orders/users/${userId}/cart`
            );
            const data = result.data;
            const productBack = data.find((x) => x.productId == product.id);
            if (productBack) {
                const result = await clienteAxios.put(
                    `orders/users/${userId}/cart`,
                    { productId: product.id, cantidad: productBack.cantidad + 1 }
                );
                console.log(result);
            } else {
                const result = await clienteAxios.post(
                    `orders/users/${userId}/cart`,
                    { productId: product.id, cantidad: 1 }
                );
                console.log(result);
            }
            return {
                ...product,
                cantidad: productBack.cantidad + 1
            }
        } else {
            return {
                ...product,
                cantidad: cantidadActual + 1
            }
        }
    }
)


const carritoSlice = createSlice({
    name: 'carrito',
    initialState,
    reducers: {
        removeProduct(state, action) {
            //Controlar el ingreso del prodcuto al carro
            const index = state.products.findIndex(x => x.id == action.payload.id);
            if (index >= 0) {
                const product = state.products[index];
                product.cantidad -= 1;
                if (product.cantidad <= 0) state.products.splice(index, 1);
            }
        },
        clearCarrito(state, action) {
            state.products = []; //.splice(0, state.products.length)
        },
        removeAllProduct(state, action) {
            const index = state.products.findIndex(x => x.id == action.payload.id);
            if (index >= 0) {
                const product = state.products[index];
                state.products.splice(index, 1);
            }
        }
    },
    extraReducers: {
        [fetchCart.fulfilled]: (state, action) => {
            state.products = [];
            for (const product of action.payload) {
                const _product = { id: product.productId, name: 'completar datos', cantidad: product.cantidad, price: product.price, img: '' }
                state.products.push(_product)
            }

            // Add user to the state array
            //state.entities.push(action.payload)
            console.log(action.payload);
            localStorage.clear("carritoGuest")
        },
        [loadGuestCart.fulfilled]: (state, action) => {
            state.products = [];
            console.log('loadGuestCart', action.payload);
            for (const product of action.payload) {
                const _product = { id: product.id, name: 'completar datos', cantidad: product.cantidad, price: product.price, img: '' }
                state.products.push(_product)
            }
        },
        [addProduct.fulfilled]: (state, action) => {
            const _producto = action.payload;
            const existe = state.products.find(x => x.id == _producto.id);
            const producto = existe ? existe : { id: _producto.id, name: _producto.name, cantidad: _producto.cantidad, price: _producto.price, img: _producto.img }
            producto.cantidad = _producto.cantidad;
            if (!existe) state.products.push(producto)
        }
    }
},
)

export const { removeProduct, clearCarrito, removeAllProduct } = carritoSlice.actions;

export const carritoReducer = carritoSlice.reducer;