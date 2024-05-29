import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import Footer from "./Footer";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the product details!",
          error
        );
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h1 class="m-0">Products</h1>
        <button class="btn btn-primary d-block" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
  
      <div class="card shadow h-100">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 text-center">
              <img src={product.image} alt={product.title} class="card-img img-fluid" style={{ width: "300px", height: "350px" }}/>
            </div>
            <div class="col-md-8">
              <h5 class="card-title mt-3">Category: {category}</h5>
              <h4 class="card-title">{product.title}</h4>
              <p class="card-text">{product.description}</p>
              <h4 class="card-subtitle mb-2 text-muted">${product.price}</h4>
              <button onClick={() => addToCart(product)} class="btn btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  

  );
}

export default ProductDetails;
