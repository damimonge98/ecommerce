import React from 'react';

const Product = ({img, title, description, price, stock}) => {
    return (
       <div className='Products-item'>
            <img src={img} alt={title} />
            <div className='Product-item-info'>
                <h2>{title}
                <span>
                    $
                    {' '}
                    {price}
                    <p>Stock: {stock}</p>
                </span>
                </h2>
                <p>{description}</p>
            </div>
            <button type='button'>Comprar</button>
        </div> 
    );
}



export default Product;