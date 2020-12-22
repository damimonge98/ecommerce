import React from 'react'
import './ProductItem.css'

const ProducItem = ({product, onIncreaseCant, onDecreaseCant}) =>{
    return <div className = 'btn-groups'>
        {product.name}
        { ' ' }
        <button  id='increase-btn' onClick={onIncreaseCant}>+</button>
        { ' ' }
        <button id='decrease-btn' onClick={onDecreaseCant}>-</button>
        <br/>
        Unidades: {product.cantidad} | Precio: {product.price * product.cantidad}$               
    </div>
}
export default ProducItem