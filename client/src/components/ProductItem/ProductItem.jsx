import React from 'react'

const ProducItem = ({product, onIncreaseCant, onDecreaseCant}) =>{
    return <div>
        {product.name} | {product.cantidad}
        <button onClick={onIncreaseCant}>+</button>
        <button onClick={onDecreaseCant}>-</button>
    </div>
}
export default ProducItem