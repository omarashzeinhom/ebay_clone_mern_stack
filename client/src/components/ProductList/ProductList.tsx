import React from "react";
import { Product } from "../../utils/searchBarConstants";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            <div>
              <img src={product.img} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
