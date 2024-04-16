import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useProductContext } from "../../../../context/ProductContext"; // Import the context
import "./DeleteProduct.scss";
import { Nav, SearchBar, SellComponent } from "../../..";
import { Product } from "../../../../models";

type ProductDetailProps = {
  total: number;
};

const DeleteProduct: React.FC<ProductDetailProps> = ({ total }) => {
  const { business, token, fetchBusinessInformation } = useAuth();
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

    if (token) {
      fetchBusinessInformation(token);
    }

    fetchData();
  }, [productId, getProductById]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put<Product>(
        `http://localhost:5000/products/${productId}`,
        product
      );
      setLoading(false);
      console.log("Product Deleted successfully!");
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
      <Nav total={total} />
      <SearchBar />
      <SellComponent />
      {business?.businessId !== null && (
        <>
          {business?.businessId === product?.businessId && (
            <div className="Delete-product-container">
              <h2>Delete Product</h2>
              <form className="product-form-container">
                <div className="product-item">
                  <label className="product-label">
                    Name:
                    <p>{product?.name}</p>
                  </label>
                  <label className="product-label">
                    Image URL:
                    <p>{product?.img}</p>
                  </label>
                  <label className="product-label">
                    Parent:
                    <p>{product?.parent}</p>
                  </label>
                  <label className="product-label">
                    Category:
                    <p className="">{product?.category}</p>
                  </label>
                  <label className="product-label">
                    Product Image
                    <img src={product?.img} className="product-img" />
                    <p className="">{product?.img}</p>
                  </label>
                  <label className="product-label">
                    Price:
                    <p className="">{product?.price}</p>
                  </label>
                  <label className="product-label">
                    Quantity:
                    <p className="">{product?.quantity}</p>
                  </label>
                  <button
                    aria-label="Delete Product Button"
                    className="delete-button"
                    onClick={handleSubmit}
                  >
                    Delete Product
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DeleteProduct;
