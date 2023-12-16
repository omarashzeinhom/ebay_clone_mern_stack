// ProductList.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import "./ProductList.scss";

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const { categoryName } = useParams();
  const { products, fetchProducts } = useProductContext();

  useEffect(() => {
    // Fetch products when the category changes, but only if categoryName is defined
    if (categoryName !== undefined) {
      fetchProducts();
    } else {
      console.log("Category name not found");
    }
    // eslint-disable-next-line
  }, [categoryName /*Dont Add fetchProducts Causes infiniteLoop */]);
  //DEBUG console.log(categoryName);

  const filteredProducts = categoryName
    ? products.filter((product) => product?.parent === categoryName)
    : products.filter((product) => categoryName === product?.parent);

  //DEBUG console.log(filteredProducts);

  const productLink = (productId: string) => `/item/${productId}`;

  return (
    <div className="product-list">
      <h2 className="product-list__header">Products</h2>
      <ul className="product-list__product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product?._id} className="product-list__product-list-item">
              <div>
                <img
                  className="product-list__product-list-image"
                  src={product?.img}
                  alt={product?.name}
                />
                <p>Category: {product?.parent}</p>
                <p className="product-list__product-list-name">
                  <a href={productLink(product?._id)}>{product?.name}</a>
                </p>
                <p className="product-list__product-list-price">
                  ${product?.price}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li className="product-list__product-list-item">No Products found</li>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
