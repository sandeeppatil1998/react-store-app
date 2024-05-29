import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  const fetchProductsByCategory = (category) => {
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterProducts = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container">
      <h1>Select a Category</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="form-group position-relative">
            <select
              className="form-control"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="dropdown-arrow"></div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div
              className="card medium-card shadow"
              style={{
                Width: "300px",
                maxheight: "400px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: "300px", objectFit: "contain" }}
              />
              <div
                className="card-body d-flex flex-column"
                style={{ background: "grey", color: "white" }}
              >
                <h6 className="card-title">{product.title}</h6>
                <p
                  className="card-text text-truncate"
                  style={{ maxHeight: "50px" }}
                >
                  {product.description}
                </p>
                <div className="mt-auto">
                  <p className="card-text">
                    <strong>${product.price}</strong>
                  </p>
                  <a
                    href={`/product/${product.id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
