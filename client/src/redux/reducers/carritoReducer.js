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

const carritoSlice = createSlice({
    name: 'carrito',
    initialState,
    reducers: {
        addProduct(state, action) {
            //Controlar el ingreso del prodcuto al carro
            const existe = state.products.find(x => x.id == action.payload.id);
            const product = existe ? existe : { id: action.payload.id, name: action.payload.name, cantidad: 1, price: action.payload.price, img: action.payload.img }
            product.cantidad += existe ? 1 : 0;
            if (!existe) state.products.push(product)
        },
        removeProduct(state, action) {
            //Controlar el ingreso del prodcuto al carro
            const index = state.products.findIndex(x => x.id == action.payload.id);
            if (index >= 0) {
                const product = state.products[index];
                product.cantidad -= 1;
                if (product.cantidad <= 0) state.products.splice(index, 1);
            }
        },
        clearAll(state, action) {
            state.products.splice(0, state.products.length)
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
            for (const product of action.payload) {
                const _product = { id: product.productId, name: 'completar datos', cantidad: product.cantidad, price: product.price, img: '' }
                state.products.push(_product)
            }

            // Add user to the state array
            //state.entities.push(action.payload)
            console.log(action.payload);
        }
    }
},
)

export const { addProduct, removeProduct, clearAll, removeAllProduct } = carritoSlice.actions;

export const carritoReducer = carritoSlice.reducer;