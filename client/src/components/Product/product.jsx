import React from 'react';
import "./product.css"
const Product = ({img, title, description, price, stock}) => {
    return (
        <div className='card'>
            <img src={img}className="card-img-top" alt={title}  />
            <div className="div-h2">
                
                <h2 className="card-h2">
                {title}
                <br/>
                {description}
                <br/>
                ${price}
                </h2>
                </div>
                <div className="div-button">
            <button className="button-card" type='button'>Comprar</button>
            </div>
        </div>
    );
}

export default Product;