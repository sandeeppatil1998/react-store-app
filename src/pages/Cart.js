import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  return (
    <>
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="m-0">Your Cart</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      {cart.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Your cart is empty.
        </div>
      ) : (
        <div className="row">
          {cart.map((product, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow d-flex flex-column">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '250px', objectFit: 'contain', padding:'20px' }}
                  />
                <div className="card-body">
                  <h5 className="card-title mb-3">{product.title}</h5>
                  <div className='d-flex justify-content-between'>

                  <h5 className="card-text">${product.price}</h5>
                  <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(product.id)}
                      >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-4" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', textAlign:'right' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Total Price:</h4>
            <h4>${getTotalPrice()}</h4>
          </div>
          <button className="btn btn-primary mt-3 ">Proceed to Checkout</button>
        </div>
      )}
    </div>
    <Footer/>
  </>
  );
}

export default Cart;
