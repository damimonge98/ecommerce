import React from 'react';

const Product = (props) => {
    return (
        <div className='Products-item'>
            <img src={props.image} alt={props.title} />
            <div className='Product-item-info'>
                <h2>{props.title}
                <span>
                    $
                    {' '}
                    {props.price}
                    <p>Stock: {props.stock}</p>
                </span>
                </h2>
                <p>{props.description}</p>
            </div>
            <button type='button'>Comprar</button>
        </div>
    );
}

export default Product;