import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: []
}


const carritoSlice = createSlice({
    name: 'carrito',
    initialState,
    reducers: {
        addProduct(state, action) {
            //Controlar el ingreso del prodcuto al carro
            const existe = state.products.find(x => x.id == action.payload.id);
            const product = existe ? existe : { id: action.payload.id, name: action.payload.name, cantidad: 1 , price:action.payload.price}
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
},
)

export const { addProduct, removeProduct, clearAll, removeAllProduct } = carritoSlice.actions;

export const carritoReducer = carritoSlice.reducer;