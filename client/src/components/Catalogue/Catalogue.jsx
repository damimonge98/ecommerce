import React, { useEffect, useState } from "react";
import Product from "../Product/Product.jsx";
import "./catalogue.css";

const Categories = ["All", "Pop", "Rock"];

const DataProduct = [
  {
    id: 1,
    img:
      "https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
    title: "GOTEO",
    price: "1",
    description: "Duki-super sangre joven",
    stock: "Infinito",
    category: "Pop",
  },
  {
    id: 2,
    img:
      "https://i.pinimg.com/736x/4e/0b/dd/4e0bddbf2f1664e14cc8d25b63db2044.jpg",
    title: "SOLO",
    price: "1",
    description: "Marshmello-ZONA69.",
    stock: "Infinito",
    category: "Pop",
  },
  {
    id: 3,
    img: "https://www.cmtv.com.ar/tapas-cd/rombainochelocasingle.jpg",
    title: "NOCHE LOCA",
    price: "1",
    description: "Marama-de fiesta.",
    stock: "Infinito",
    category: "Pop",
  },
  {
    id: 4,
    img:
      "https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
    title: "GOTEO",
    price: "1",
    description: "Duki-super sangre joven",
    stock: "Infinito",
    category: "Rock",
  },
  {
    id: 5,
    img:
      "https://i.pinimg.com/736x/4e/0b/dd/4e0bddbf2f1664e14cc8d25b63db2044.jpg",
    title: "SOLO",
    price: "1",
    description: "Marshmello-ZONA69.",
    stock: "Infinito",
    category: "Rock",
  },
  {
    id: 6,
    img: "https://www.cmtv.com.ar/tapas-cd/rombainochelocasingle.jpg",
    title: "NOCHE LOCA",
    price: "1",
    description: "Marama-de fiesta.",
    stock: "Infinito",
    category: "Rock",
  },
  {
    id: 7,
    img:
      "https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
    title: "GOTEO",
    price: "1",
    description: "Duki-super sangre joven",
    stock: "Infinito",
    category: "Rock",
  },
  {
    id: 8,
    img:
      "https://i.pinimg.com/736x/4e/0b/dd/4e0bddbf2f1664e14cc8d25b63db2044.jpg",
    title: "SOLO",
    price: "1",
    description: "Marshmello-ZONA69.",
    stock: "Infinito",
    category: "Rock",
  },
  {
    id: 9,
    img: "https://www.cmtv.com.ar/tapas-cd/rombainochelocasingle.jpg",
    title: "NOCHE LOCA",
    price: "1",
    description: "Marama-de fiesta.",
    stock: "Infinito",
    category: "Rock",
  },
  {
    id: 10,
    img:
      "https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
    title: "GOTEO",
    price: "1",
    description: "Duki-super sangre joven",
    stock: "Infinito",
    category: "Rock",
  },
  {
    id: 11,
    img: "https://www.cmtv.com.ar/tapas-cd/rombainochelocasingle.jpg",
    title: "NOCHE LOCA",
    price: "1",
    description: "Marama-de fiesta.",
    stock: "Infinito",
    category: "Rock",
  },
  {
    id: 12,
    img:
      "https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg",
    title: "GOTEO",
    price: "1",
    description: "Duki-super sangre joven",
    stock: "Infinito",
    category: "Rock",
  },
  
];
// aca se van a renderizar todas las card de product
const Cataloge = () => {
  const [products, setProducts] = useState([]);
  const [currentCategory, SetCurrentCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categorias = Categories; //carga la primera vez que pongo la ruta
    setCategories(categorias);
    //setProducts(DataProduct);
  }, []);

  useEffect(() => {
    console.log("effect");
    if (currentCategory === "All") {
      setProducts(DataProduct);
    } else {
      const array = DataProduct.filter((e) => e.category === currentCategory); //corregir filtrado por value o selección
      setProducts(array);
    }
  }, [currentCategory]);

  return (
    <div className="box">
      <div className="nav-lateral">
        <div >
      <select className="select"
        onChange={(e) => {
          SetCurrentCategory(e.target.value);
        }}>
        {categories.map((c) => (
          <option className="option" key={c}>{c}</option>
        ))}
      </select>
      
      
        <select className="select">
          <option className="option">
            duki
          </option>
          <option className="option">
          Marshmello
          </option>
          <option className="option">
          marama
          </option>
        </select>
        
      </div>
      </div>
      <div className="container">
      {products.map((i) => {
        return (
          <div key={i.id}>
            <Product
              img={i.img}
              title={i.title}
              price={i.price}
              description={i.description}
            />
          </div>
        );
      })}
    </div>
    </div>
  );
  
};

export default Cataloge;
