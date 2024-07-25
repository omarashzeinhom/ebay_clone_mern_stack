import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import "./ProductList.scss";
import { Product } from "../../../models/product";
import CategorySideBar from "../../Categories/CategorySideBar/CategorySideBar";
import { useShoppingCart } from "../../../context/ShoppingCartContext";

interface ProductListProps {
  products: Product[];
}


const ProductList: React.FC<ProductListProps> = () => {
  const { categoryName } = useParams();
  const { products, fetchProducts, getProductById, getProductsByName, searchQuery } = useProductContext();
  const { addItemToCart, getItemQuantity } = useShoppingCart();
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  //console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData || null); // Set to null if productData is undefined
      }
      if (searchQuery) {
        const productData = await getProductsByName(searchQuery);
        setProduct(productData || null); // Set to null if productData is undefined
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch products based on category
    if (categoryName) {
      fetchProducts();
    }
  }, []);



  const filteredProducts = categoryName
    ? products.filter(product => product.category === categoryName)
    : products;

  return (
    <div className="product-list-layout">
      <CategorySideBar />
      <div className="product-list">
        <h2 className="product-list__header">Products</h2>
        <h3>{categoryName}</h3>
      {products !== null && (
          <ul className="product-list__product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product._id} className="product-list__product-list-item">
                <div className="product-list__product-list-item-top">
                  <a className="product-list__product-link" href={`/item/${product?._id}`}>
                    <img
                      className="product-list__product-list-image"
                      src={product?.img}
                      alt={product?.name}
                      loading="lazy"
                    />
                    <p className="product-list__product-list-name">{product?.name}</p>
                  </a>
                  <div className="product-list__product-list-price-container">
                    {getItemQuantity(product?.id) === 0 && (
                      <button
                        aria-label="AddProductToCart"
                        className="product-detail__button"
                        onClick={() => addItemToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                    <span className="product-list__product-list-price">{product?.price}$</span>
                  </div>
                  <p className="product-list__product-list-category">
                    <em>Category:</em>
                    <a href={`/category/${encodeURIComponent(product.category)}`}>{product.category}</a>                  </p>
                </div>
              </li>
            ))
          ) : (
           <>
            <li className="product-list__product-list-item">
              <h4>No Products Found! in this Category</h4>
            </li>
         
           </>
          )}
        </ul>
      )}
      
      </div>
    </div>
  );
};

export default ProductList;