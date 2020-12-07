import React from 'react';

const Product = () => {
    return (
        <div className='Products-item'>
            <img src={product.image} alt={product.title} />
            <div className='Product-item-info'>
                <h2>{product.title}
                <span>
                    $
                    {' '}
                    {product.precio}
                </span>
                </h2>
                <p>{product.description}</p>
            </div>
            <button type='button'>Comprar</button>
        </div>
    );
}

export default Product;