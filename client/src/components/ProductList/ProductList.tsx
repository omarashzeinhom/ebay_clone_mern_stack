// ProductList.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import "./ProductList.scss"; // Import the SCSS file

interface ProductListProps {
  selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
  const { products, fetchProducts } = useProductContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, fetchProducts]);

  const handleCategoryChange = () => {
    navigate("/");
  };

  return (
    <div className="product-list">
      <h2 className="product-list__header">Products</h2>

      {/* UI to change the selected category */}
      <div>
        <button
          className="product-list__category-button"
          onClick={handleCategoryChange}
        >
          All Categories
        </button>
      </div>

      <ul className="product-list__product-list">
        {products.map((product) => (
          <li key={product.name} className="product-list__product-list-item">
            <div>
              <img
                className="product-list__product-list-image"
                src={product.img}
                alt={product.name}
              />
              <p className="product-list__product-list-name">{product.name}</p>
              <p className="product-list__product-list-price">
                ${product.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
