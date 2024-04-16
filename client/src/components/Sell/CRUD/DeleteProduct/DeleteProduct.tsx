import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useProductContext } from "../../../../context/ProductContext"; // Import the context
import "./DeleteProduct.scss";
import { Nav, SearchBar, SellComponent } from "../../..";
import { productService } from "../../../../services/productService";

type ProductDetailProps = {
  total: number;
};

const DeleteProduct: React.FC<ProductDetailProps> = ({ total }) => {
  const { business, token, fetchBusinessInformation } = useAuth();
  const { productId } = useParams();
  const { getProductById } = useProductContext();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }, [productId, getProductById, fetchBusinessInformation, token]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
     const data = await productService.deleteProduct(`${productId}`); 
      setLoading(false);
      console.log("Product deleted:", data);
      console.log("Product Deleted successfully!");
    } catch (error) {
      console.error("Error Deleting product:", error);
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
            {loading && <p>Loading...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <h2>Delete Product</h2>
              <form className="product-form-container" onSubmit={handleSubmit}>
                <div className="delete-product-container">
                    <p>
                      {" "}
                      <strong>id:</strong>
                      {product?.id}
                    </p>
                    <p>
                      <strong> _id:</strong>
                      {product?._id}
                    </p>
                    <p>
                      <strong>Name:</strong>
                      {product?.name}
                    </p>
                    <p>
                      <strong>Parent:</strong>
                      {product?.parent}
                    </p>
                    <p className="">
                      <strong>Category:</strong>
                      {product?.category}
                    </p>
                    <p className="">
                      <strong> Product Image & Url:</strong>
                      {product?.img}
                      <img
                      src={product?.img}
                      className="product-img"
                      alt={product?.name}
                    />
                    </p>

               
                    <p className="">
                      <strong> Price:</strong>
                      {product?.price}
                    </p>
                    <p className="">
                      <strong> Quantity:</strong>
                      {product?.quantity}
                    </p>
                    <p className="">
                      <strong> BusinessId:</strong>
                      {product?.businessId}
                    </p>
                  <button
                    aria-label="Delete Product Button"
                    className="delete-button"
                    type="submit"
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
