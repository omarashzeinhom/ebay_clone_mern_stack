import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {  useProductContext  , useBusinessAuth} from "../../../../context/";
import "./UpdateProduct.scss";
import { Product } from "../../../../models";
import { Nav, SearchBar,SellComponent } from "../../..";

type ProductDetailProps = {
  total: number;
};

const UpdateProduct: React.FC<ProductDetailProps> = ({ total }) => {
  const { business, businessToken, fetchBusinessInformation } = useBusinessAuth();
  const { productId } = useParams();
  const { getProductById } = useProductContext();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData);
      }
    };

    if (businessToken) {
      fetchBusinessInformation(businessToken);
    }

    fetchData();
  }, [productId, getProductById,fetchBusinessInformation,businessToken]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    propertyName: keyof Product
  ) => {
    if (!product) return;
    const newProduct = {
      ...product,
      [propertyName]: e.target.value,
    };
    setProduct(newProduct);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put<Product>(
        `http://localhost:5000/products/${productId}`,
        product
      );
      setLoading(false);
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      setLoading(false);
    }
  };

  if (!product) {
   
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Nav total={total} pageTitle="UpdateProduct"/>
      <SearchBar />
      <SellComponent/>
      {business?.businessId !== null && (
        <>
          {business?.businessId === product?.businessId && (
            <div className="update-product-container">
              {loading}
              <h2>Update Product</h2>
              <form className="product-form-container">
                <div className="product-item">
                  <label className="product-label">
                    Name:
                    <input
                      className="product-input"
                      type="text"
                      value={product?.name}
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                  </label>
                  <label className="product-label">
                    Image URL:
                    <input
                      className="product-input"
                      type="text"
                      value={product?.img}
                      onChange={(e) => handleInputChange(e, "img")}
                    />
                  </label>
                  <label className="product-label">
                    Parent:
                    <input
                      className="product-input"
                      type="text"
                      value={product?.parent}
                      onChange={(e) => handleInputChange(e, "parent")}
                    />
                  </label>
                  <label className="product-label">
                    Category:
                    <input
                      className="product-input"
                      type="text"
                      value={product?.category}
                      onChange={(e) => handleInputChange(e, "category")}
                    />
                  </label>
                  <label className="product-label">
                    Product Image
                    <img 
                    src={product?.img} 
                    alt={product?.name || "Product Image"}
                    className="product-img" 
                    />
                    <input
                      className="product-input"
                      type="file"
                      src={product?.img}
                      //value={product.img}
                      //onChange={(e) => handleInputChange(e, "img")}
                    />
                    <input
                      className="product-input"
                      type="text"
                      hidden
                      value={product?.img}
                      onChange={(e) => handleInputChange(e, "img")}
                    />
                  </label>
                  <label className="product-label">
                    Price:
                    <input
                      className="product-input"
                      type="number"
                      value={product?.price}
                      onChange={(e) => handleInputChange(e, "price")}
                    />
                  </label>
                  <label className="product-label">
                    Quantity:
                    <input
                      className="product-input"
                      type="number"
                      value={product?.quantity}
                      onChange={(e) => handleInputChange(e, "quantity")}
                    />
                  </label>
                </div>
              </form>
              <button
                aria-label="Update Product Button"
                className="update-button"
                onClick={handleSubmit}
              >
                Update Product
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UpdateProduct;
