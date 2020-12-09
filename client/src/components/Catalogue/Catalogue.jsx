import React from 'react';
import Product from '../Product/Product.jsx'
import "./catalogue.css"
const DataProduct =[
    {
    id:1,
    img:"https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
    title:"GOTEO",
    price:"1",
    description:"Duki-super sangre joven",
    stock:"Infinito"
    },
    {
    id:2,
    img:"https://i.pinimg.com/736x/4e/0b/dd/4e0bddbf2f1664e14cc8d25b63db2044.jpg",
    title:"SOLO",
    price:"1",
    description:"Marshmello-ZONA69.",
    stock:"Infinito"
    },
    {
    id:3,
    img:"https://www.cmtv.com.ar/tapas-cd/rombainochelocasingle.jpg",
    title:"NOCHE LOCA",
    price:"1",
    description:"Marama-de fiesta.",
    stock:"Infinito"
    },
    {
        id:4,
        img:"https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
        title:"GOTEO",
        price:"1",
        description:"Duki-super sangre joven",
        stock:"Infinito"
        },
        {
            id:5,
            img:"https://i.pinimg.com/736x/4e/0b/dd/4e0bddbf2f1664e14cc8d25b63db2044.jpg",
            title:"SOLO",
            price:"1",
            description:"Marshmello-ZONA69.",
            stock:"Infinito"
            },
            {
            id:6,
            img:"https://www.cmtv.com.ar/tapas-cd/rombainochelocasingle.jpg",
            title:"NOCHE LOCA",
            price:"1",
            description:"Marama-de fiesta.",
            stock:"Infinito"
            },    {
                id:7,
                img:"https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
                title:"GOTEO",
                price:"1",
                description:"Duki-super sangre joven",
                stock:"Infinito"
                },
                {
                id:8,
                img:"https://i.pinimg.com/736x/4e/0b/dd/4e0bddbf2f1664e14cc8d25b63db2044.jpg",
                title:"SOLO",
                price:"1",
                description:"Marshmello-ZONA69.",
                stock:"Infinito"
                },
                {
                id:9,
                img:"https://www.cmtv.com.ar/tapas-cd/rombainochelocasingle.jpg",
                title:"NOCHE LOCA",
                price:"1",
                description:"Marama-de fiesta.",
                stock:"Infinito"
                },
                {
                    id:10,
                    img:"https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
                    title:"GOTEO",
                    price:"1",
                    description:"Duki-super sangre joven",
                    stock:"Infinito"
                    },

]
// aca se van a renderizar todas las card de product
const Cataloge = () => {
     return(
        <div className="container">
            {DataProduct.map((i)=>{
                return(
            <div key={i.id}>
            <Product img={i.img} title={i.title} price={i.price} description={i.description} />
            </div>
        )
        })}
        </div>
        )
}
    


export default Cataloge;