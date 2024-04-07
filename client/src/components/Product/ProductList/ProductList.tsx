import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import "./ProductList.scss";
import Loading from "../../Loading/Loading";
import { Product } from "../../../models/product";
import CategorySideBar from "../../Categories/CategorySideBar/CategorySideBar";
import { useShoppingCart } from "../../../context/ShoppingCartContext";

interface ProductListProps {
  products: Product[]; 
}

const ProductList: React.FC<ProductListProps> = ({ products: productListProp }) => {
  const { categoryName } = useParams();
  const { products, fetchProducts,getProductById,getProductsByName,searchQuery } = useProductContext();
  const {
    addItemToCart,
    getItemQuantity,
  } = useShoppingCart();
  const { productId } = useParams<{ productId: string}>();
  console.log(searchQuery);
  
  const [product, setProduct] = useState<any | null>(null);
  console.log("searchQuery:=====>" + searchQuery);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData);
      }
      if(searchQuery){
        const productData = await getProductsByName(searchQuery);
        setProduct(productData);
      }
    };

    fetchData();
  }, [productId, getProductById, searchQuery, getProductsByName]);

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
    ? products.filter((product) => product?.category === categoryName)
    : products.filter((product) => categoryName === product?.category);

  //DEBUG console.log(filteredProducts);

  const productLink = (productId: string) => `/item/${productId}`;
  const id = product?.id;

  const quantity = getItemQuantity(id);
  //console.log(quantity);

  // function handleRouting() {
  //  navigate(`/category/${encodeURIComponent(product?.category)}`);
 // }

  return (
    <div className="product-list-layout">
      <CategorySideBar />
      <div className="product-list">
        <h2 className="product-list__header">Products</h2>
        <h3>{categoryName}</h3>
        <ul className="product-list__product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product?._id} className="product-list__product-list-item">
                <div className="product-list__product-list-item-top">
                  <a className="product-list__product-link" href={`${productLink(product?._id)}`}>
                    <img
                      className="product-list__product-list-image"
                      src={product?.img}
                      alt={product?.name}
                      loading="lazy"
                    />
                    <p className="product-list__product-list-name">{product?.name}</p>

                  </a>
                  <div className="product-list__product-list-price-container">

                    {quantity === 0 && (
                      <button
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
                    <br />
                    <br />
                    <a href={`${encodeURIComponent(product?.category)}`}>
                      {product?.category}</a></p>
                </div>
              </li>
            ))
          ) : (
            <li className="product-list__product-list-item">
              <Loading />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
