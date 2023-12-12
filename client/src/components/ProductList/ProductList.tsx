// ProductList.tsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import "./ProductList.scss";

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const { categoryName } = useParams();
  const { products, fetchProducts, setCategory } = useProductContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products when the category changes, but only if categoryName is defined
    if (categoryName !== undefined) {
      fetchProducts();
    }
    // eslint-disable-next-line
  }, [categoryName /*Dont Add fetchProducts Causes infiniteLoop */]);
  console.log(categoryName);

  const handleCategoryChange = () => {
    if (categoryName !== undefined) {
      setCategory(categoryName);
      navigate(`/category/${encodeURIComponent(categoryName)}`);
    } else {
      navigate("/products");
    }
  };

  const filteredProducts = categoryName
    ? products.filter((product) => product?.parent === categoryName)
    : products;

  return (
    <div className="product-list">
      <h2 className="product-list__header">Products</h2>

      <div>
        <button
          className="product-list__category-button"
          onClick={handleCategoryChange}
        >
          All Categories
        </button>
      </div>

      <ul className="product-list__product-list">
        {filteredProducts.map((product) => (
          <li key={product?._id} className="product-list__product-list-item">
            <div>
              <img
                className="product-list__product-list-image"
                src={product?.img}
                alt={product?.name}
              />
              <p>Category: {product?.parent}</p>
              <p className="product-list__product-list-name">{product?.name}</p>
              <p className="product-list__product-list-price">
                ${product?.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
