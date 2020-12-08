import React from 'react';

const Product = () => {
    return (
        <div className='Products-item'>
            <img src={require('./images/trueno.jpg')} width='20%'  alt="trueno" /> 
            <div className='Product-item-info'>
                <h2> Trueno y Nicki Nicole</h2>
                <h4>'Mamichula'</h4>
                <span>
                    <h4>Precio $ 0.50</h4>
                    <h5>Stock: disponible</h5>
                </span>
                
                
            </div>
            <button type='button'>Comprar</button>
        </div>
    );
}

{/* <div className='Products-item'>
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
        </div> */}

export default Product;