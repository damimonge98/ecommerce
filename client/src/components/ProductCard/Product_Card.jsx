import React from "react";
import "./Product_Card.css";

const productCard = (props) => {
  return (
    <div className="bodyb">
      <div className="container">
        <div className="row my-2">
          <div className="col-lg-6 col-md-6 shadow content p-5">
            <div className="row my-3">
              <div className="d-flex justify-content-end">
                <div className="arrows">
                  <i className="fas fa-arrow-circle-left" id="arrow1"></i>
                  <i className="fas fa-arrow-circle-right" id="arrow2"></i>
                </div>
              </div>
            </div>
            <div className="row my-lg-5 my-md-4">
              <h1>{props.title}</h1>
              <div className="price">
                $<span>{props.price}</span>
              </div>
              <hr className="line" />
              <p className="description">{props.description}</p>
            </div>
            <div className="row my-3">
              <ul className="list-style">
                <li>
                  <i className="fas fa-long-arrow-alt-right"></i>&nbsp; High
                  Quality Audio
                </li>
                <li>
                  <i className="fas fa-long-arrow-alt-right"></i>&nbsp; You can
                  download it again anytime!
                </li>
                <li>
                  <i className="fas fa-long-arrow-alt-right"></i>&nbsp; All your
                  favorite artists are here!
                </li>
              </ul>
            </div>
            <div className="row my-4 ">
              <div className="cart-btn d-flex justify-content-center">
                <div className="row-margin">
                  <button type="button" className="btn btn-custom text-white">
                    <i className="fas fa-shopping-basket"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 p-0 py-md-5 my-xs-0 my-lg-4 my-md-5">
            <div className="py-2 my-lg-0 my-md-5">
              <img
                src={props.image}
                className="img-fluid"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default productCard;
