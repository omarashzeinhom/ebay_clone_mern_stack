// ProductList.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import "./ProductList.scss";
import Loading from "../../Loading/Loading";
import { Product } from "../../../models/product";

interface ProductListProps {
  products: Product[]; // Replace YourProductType with the actual type of your products

}

const ProductList: React.FC<ProductListProps> = ({products: productListProp }) => {
  const { categoryName } = useParams();
  const { products, fetchProducts } = useProductContext();


  useEffect(() => {
    console.log("Products in ProductList component:", productListProp);

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
    ? products.filter((product) => product?.category  === categoryName)
    : products.filter((product) => categoryName === product?.category);

  //DEBUG console.log(filteredProducts);

  const productLink = (productId: string) => `/item/${productId}`;

  return (
    <div className="product-list">
      <h2 className="product-list__header">Products</h2>
      <ul className="product-list__product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product?._id} className="product-list__product-list-item">
                <a className="product-list__product-link"href={productLink(product?._id)}>
              <div>
                <img
                  className="product-list__product-list-image"
                  src={product?.img}
                  alt={product?.name}
                  loading="lazy"
                />
                <p className="product-list__product-list-name">
                {product?.name}
                </p>
                <p className="product-list__product-list-price">
                  ${product?.price}
                </p>
                <p>Category: {product?.parent}</p>

              </div>
              </a>
            </li>
          ))
        ) : (
          <li className="product-list__product-list-item">
<Loading/>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProductList;


