import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Product from "../Product/Product.jsx";
import "./catalogue.css";
import { getProducts } from "../../redux/actions/productActions";
import { Context } from "../../App";
import spinner from "../Spinner";
import { getAllReviews } from "../../redux/actions/reviewActions";
import { getUserOrderDetail } from "../../redux/actions/orderActions.js";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
// aca se van a renderizar todas las card de product

const Cataloge = () => {
  const { currentCategory } = useContext(Context);
  const [productos, setProductos] = useState([]);
  //traigo los datos del array "productos" del estado inicial, que está adentro de un array "products"
  const products = useSelector((state) => state.products.productos);
  //constantes para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(12);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const userAuthenticated = useSelector((state) => state.user.userAUTH);
  const userData = useSelector((state) => state.user);

  const idUser = useSelector((state) => state.user.userAUTH);
  const [state, setState] = useState(0); //Estado solamente para que el useEffect reconozca
  //un cambio en el componente y lo vuelva a renderizar

  useEffect(() => {
    if (userData.isAuthenticated) {
      const obtenerUserOrden = () => dispatch(getUserOrderDetail(idUser.id));
      obtenerUserOrden();
    }
  }, [state]);

  if (!products.data) {
    var currentProducts = !productos
      ? spinner()
      : Array.isArray(productos) &&
        productos.slice(indexOfFirstProduct, indexOfLastProduct);
  } else {
    currentProducts = products.data;
  }

  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    //si no hay productos, aparece el spinner
    if (!products) return spinner();
    //cuando entra en / la categoría es 'All', está seteada así en Sidebar, y renderiza todos los productos
    (async () => {
      try {
        if (currentCategory === "All") await setProductos(products);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  useEffect(() => {
    if (!products) return spinner();
    (async () => {
      //una vez la categoría cambia de All a cualquier otro nombre, va a insertar en un nuevo array el producto que tenga esa categoría asociada
      if (currentCategory !== "All") {
        const filterProducts = [];
        Array.isArray(products) &&
          products.forEach((producto) =>
            producto.categories.forEach((categoria) => {
              if (categoria.name == currentCategory) {
                filterProducts.push(producto);
              }
            })
          );
        await setProductos(filterProducts);
      }
    })();
  }, [currentCategory]);

  const dispatch = useDispatch();

  useEffect(() => {
    const cargarProductos = () => dispatch(getProducts());
    setProductos(cargarProductos());
  }, []);

  useEffect(() => {
    const getReviews = () => dispatch(getAllReviews());
    getReviews();
  }, []);


  const harcodedProducts = [
    {
        
        "id":1,
        "name":"Guns & Roses",
        "price": 100,
        "stock": 50,
        "category":"Rock",
        "description":"More info soon!",
        "img":"https://www.orbitaRock.com/sites/default/files/styles/optimizado-820-escalable/public/articles2014/guns_n_roses.jpg?itok=h94JIrQj"
    },
    {
        
        "id":2,
        "name": "Queen",
        "price": 100,
        "stock": 50,
        "category":"Rock",
        "description":"More info soon!",
        "img":"https://dvfnvgxhycwzf.cloudfront.net/media/SharedImage/image500/.f1YaJf1T/SharedImage-8021.jpg?t=fae5e7c7084ba5746090"
    },
    {
        
        "id":3,
        "name":"Nirvana",
        "price": 250,
        "stock": 35,
        "category":"Rock",
        "description":"More info soon!",
        "img":"https://indiehoy.com/wp-content/uploads/2020/09/nirvana-logo.jpg"
    },
  
    {
        
        "id":5,
        "name":"La Nueva Luna",
        "price": 200,
        "stock": 25,
        "category":"Cumbia",
        "description":"More info soon!",
        "img":"https://1.bp.blogspot.com/-TEWQHo3tc6Q/V3hKSzh0oQI/AAAAAAAADMM/igboWG6iJeQMwXIdpVNMtl2nryWW5fuIACKgB/s320/la-nueva-luna-la-fuerza-joven-1996.jpg"
    },
    {
        
        "id":6,
        "name":"El Gran Combo de Puerto Rico",
        "price": 250,
        "stock": 20,
        "category":"Salsa",
        "description":"More info soon!",
        "img":"https://img.discogs.com/MP774xKlKdXKTV_T_SlNm689zhI=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-5042884-1382952037-5436.jpeg.jpg"
    },
    {
        
        "id":7,
        "name":"Shakira",
        "price": 250,
        "stock": 0,
        "category":"Pop",
        "description":"More info soon!",
        "img":"https://los40es00.epimg.net/los40/imagenes/2017/04/06/album/1491501684_617106_1491503108_album_normal.jpg"
    },
    {
        
        "id":8,
        "name":"Bacilos",
        "price": 250,
        "stock": 20,
        "category":"Pop",
        "description":"More info soon!",
        "img":"https://direct.rhapsody.com/imageserver/images/Alb.468327697/170x170.jpg"
    },
    {
        
        "id":9,
        "name":"RBD",
        "price": 250,
        "stock": 20,
        "category":"Pop",
        "description":"More info soon!",
        "img":"https://img.discogs.com/o6F1CBJucQOHRGp0mahu3Rb8Li4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-3099392-1568483341-9616.jpeg.jpg"
    },
    {
        
        "id":10,
        "name":"Backstreet boys",
        "price": 250,
        "stock": 20,
        "category":"Pop",
        "description":"More info soon!",
        "img":"https://blogmistermusic.files.wordpress.com/2019/01/600x600bf.png?w=361&h=361"
    },
    {
        
        "id":11,
        "name":"Timbiriche",
        "price": 250,
        "stock": 0,
        "category":"Rock",
        "description":"More info soon!",
        "img":"https://upload.wikimedia.org/wikipedia/en/7/7d/La_Banda_Timbiriche_en_Concierto_album_cover.jpg"
    },

    {
        
        "id":13,
        "name":"Beastie Boys",
        "price": 250,
        "stock": 20,
        "category":"Pop",
        "description":"More info soon!",
        "img":"https://www.larata.cl/wp-content/uploads/2020/01/beastie-boys-700x525.jpg"
    },
    {
        
        "id":14,
        "name":"Eminem",
        "price": 250,
        "stock": 20,
        "category":"Rap",
        "description":"More info soon!",
        "img":"https://miro.medium.com/max/900/1*qhKdx3DUOo26etSKJhnxWw.jpeg"
    },
    {
        
        "id":15,
        "name":"Jay-Z",
        "price": 250,
        "stock": 0,
        "category":"Rap",
        "description":"More info soon!",
        "img":"https://upload.wikimedia.org/wikipedia/en/7/74/Jay-z-vol-3-life-and-times-s-carter.jpg"
    },
    {
        
        "id":16,
        "name":"Calle 13",
        "price": 250,
        "stock": 20,
        "category":"Rap",
        "description":"More info soon!",
        "img":"https://i.imgur.com/wVwGyKp.jpg"
    },
    {
        
        "id":17,
        "name":"Daddy Yankee",
        "price": 250,
        "stock": 20,
        "category":"Reggaeton",
        "description":"More info soon!",
        "img":"https://talentomusical.net/wp-content/uploads/2020/02/Albumism_DaddyYankee_BarrioFino_MainImage.jpg"
    },
    {
        
        "id":18,
        "name":"Bad Bunny",
        "price": 250,
        "stock": 20,
        "category":"Trap",
        "description":"More info soon!",
        "img":"https://cdn2.mediotiempo.com/uploads/media/2020/05/10/bad-bunny-avisos-previos-lanzamiento.jpg"
    }
    ,
    {
        
        "id":19,
        "name":"Nicky Jam",
        "price": 250,
        "stock": 20,
        "category":"Reggaeton",
        "description":"More info soon!",
        "img":"https://img.discogs.com/rjmJDroGwujTye2l7np32DqastI=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-13153734-1548987183-6163.jpeg.jpg"
    },
    {
        
        "id":20,
        "name":"Anitta",
        "price": 250,
        "stock": 20,
        "category":"Reggaeton",
        "description":"More info soon!",
        "img":"https://www.buenamusica.com/media/fotos/cantantes/biografia/anitta.jpg"
    },
    {
        
        "id":21,
        "name":"Alexis & Fido",
        "price": 250,
        "stock": 20,
        "category":"Reggaeton",
        "description":"More info soon!",
        "img":"https://www.famousbirthdays.com/group_images/medium/alexis-fido-band.jpg"
    },
    {
        
        "id":22,
        "name":"The Weeknd",
        "price": 250,
        "stock": 20,
        "category":"Pop",
        "description":"More info soon!",
        "img":"https://www.elquintobeatle.com/wp-content/uploads/2020/03/the-weeknd-2020-1-1068x1602.jpg"
    },
    {
        
        "id":23,
        "name":"Duki",
        "price": 250,
        "stock": 20,
        "category":"Trap",
        "description":"More info soon!",
        "img":"https://www.filo.news/__export/1565217918279/sites/claro/img/2019/08/07/dukinuevovideo.jpg_423682103.jpg"
    },
    {
        
        "id":24,
        "name":"Linkin Park",
        "price": 250,
        "stock": 20,
        "category":"Rock",
        "description":"More info soon!",
        "img":"https://garajedelRock.com/wp-content/uploads/2019/10/linkin-park-2001-1024x768.jpg"
    }
]
  return (
    <div>
      <div className="box">
        <div className="containerCatalogue">
          {!harcodedProducts
            ? spinner()
            : harcodedProducts.map((i) => {
                //validamos el stock. En caso que este agotado, le agregamos una propiedad
                //para utilizarlo despues
                if (i.stock === 0) {
                  return (
                    <div key={i.id}>
                      <Product
                        image={i.img}
                        name={i.name}
                        price={i.price}
                        description={i.description}
                        id={i.id}
                        sold_out={true}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={i.id}>
                      <Product
                        image={i.img}
                        name={i.name}
                        price={i.price}
                        description={i.description}
                        id={i.id}
                        sold_out={false}
                      />
                    </div>
                  );
                }
              })}

          <div className="pag">
            <div className="pagnation">
              <Pagination
                productPerPage={productPerPage}
                totalproduct={products.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cataloge;
