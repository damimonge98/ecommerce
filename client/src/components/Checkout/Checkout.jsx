import React from "react";
import "./Checkout.css";
import Form from "react-bootstrap/Form";

export const Checkout = () => {
  return (
    <div className="container">
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" novalidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                value=""
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
                value=""
                required
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label for="email">
              Email <span className="text-muted"></span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label for="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
              required
            />
            <div className="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div className="mb-3">
            <label for="address2">
              Address 2 <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="address2"
              placeholder="Apartment or suite"
            />
          </div>

          <div className="row">
            <div className="col-md-3 mb-3">
              <label for="state">Country</label>
              <Form.Control as="select">
                <option value="">Choose...</option>
                <option>Argentina</option>
              </Form.Control>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label for="state">State</label>
              <Form.Control as="select">
                <option value="">Choose...</option>
                <option>Buenos Aires</option>
              </Form.Control>
              <div className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label for="zip">Zip</label>
              <input
                type="text"
                className="form-control"
                id="zip"
                placeholder=""
                required
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="col-100">
            <h3>Payment</h3>
            <label for="fname">Accepted Cards</label>
            <div className="icon-container">
              <img src="https://img.icons8.com/color/72/visa.png" alt="" style = {{height: "50px"}}/>
              <img src="https://img.icons8.com/color/amex.png" />
              <img src="https://img.icons8.com/color/mastercard.png" />
              <img src="https://img.icons8.com/color/discover.png" />
            </div>
          </div>
          <hr className="mb-4" />

          <h4 className="mb-3">Payment</h4>

          <div className="d-block my-3">
            <Form.Check aria-label="option 1" label="Credit Card" />
            <Form.Check aria-label="option 1" label="Debit Card" />
          </div>
          <hr className="mb-4" />
          <div className="row">
            <div className="col-md-6 mb-3">
              <label for="cc-name">Name on card</label>
              <input
                type="text"
                className="form-control"
                id="cc-name"
                placeholder=""
                required
              />
              <small className="text-muted">
                Full name as displayed on card
              </small>
              <div className="invalid-feedback">Name on card is required</div>
            </div>
            <div className="col-md-6 mb-3">
              <label for="cc-number">Credit card number</label>
              <input
                type="text"
                className="form-control"
                id="cc-number"
                placeholder=""
                required
              />
              <div className="invalid-feedback">
                Credit card number is required
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input
                type="text"
                className="form-control"
                id="cc-expiration"
                placeholder="MM"
                required
              />
              <div className="invalid-feedback">Expiration date required</div>
            </div>
            <div className="col-md-1 mb-3">
              <label for="cc-expiration"></label>
              <input
                type="text"
                className="form-control"
                id="cc-expiration"
                placeholder="YY"
                required
              />
              <div className="invalid-feedback">Expiration date required</div>
            </div>
            <div className="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input
                type="text"
                className="form-control"
                id="cc-cvv"
                placeholder=""
                required
              />
              <div className="invalid-feedback">Security code required</div>
            </div>
          </div>
          <hr className="mb-4" />
          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
