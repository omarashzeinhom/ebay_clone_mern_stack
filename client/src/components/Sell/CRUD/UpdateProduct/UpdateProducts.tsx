import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useProductContext } from "../../../../context/ProductContext"; // Import the context
import "./UpdateProduct.scss";
import { Nav, SearchBar } from "../../..";
import { Product } from "../../../../models";

type ProductDetailProps = {
  total: number;
  
  }


  const UpdateProduct: React.FC<ProductDetailProps> = ({total}) => {
    const { business } = useAuth();
  const { productId } = useParams();
  const {getProductById} =useProductContext();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData);
      }
    };

    fetchData();
  }, [productId, getProductById]);

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
  const id = product?.id;

  return (
    <>
      <Nav total={total} />
      <SearchBar />
      <div className="update-product-container">
        <h2>Update Product</h2>
        <form className="product-form-container">
          <div className="product-item">
            <label className="product-label">
              Name:
              <input
                className="product-input"
                type="text"
                value={product.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </label>
            {/* Include other input fields similarly */}
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
    </>
  );
}

export default UpdateProduct;