import axios from "axios";
import "./ReadProduct.scss";
import { useState, useEffect } from "react";
import { Product } from "../../../../models/product";
import { Link, useParams } from "react-router-dom";
import { useProductContext, useBusinessAuth } from "../../../../context/";

export default function ReadProduct() {
  const { business } = useBusinessAuth();
  const [businessProducts, setBusinessProducts] = useState<Product[]>([]);
  const {
    getProductById,
  } = useProductContext();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any | null>(null);


  useEffect(() => {
    const fetchBusinessProducts = async () => {
      try {
        if (business && business.businessId) {
          const response = await axios.get<Product[]>(
            `http://localhost:5000/products/by-business/${business.businessId}`
          );
          setBusinessProducts(response.data);
          if (productId) {
            const productData = await getProductById(productId);
            setProduct(productData);
          }
        }
      } catch (error) {
        console.error("Error fetching products by business ID:", error);
        setProduct(product);
      }
    };

    fetchBusinessProducts();
  }, [product, productId, getProductById, business]);

  const editProductLink = (productId: string) => `/edit/${productId}`;
  const deleteProductLink = (productId: string) => `/delete/${productId}`;

  return (
    <div className="business-products-container">
      <h2>Manage Business Products</h2>
      {businessProducts?.length > 0 ? (
        <div className="product-list">
          <h3>Products Owned By Business {businessProducts?.length}</h3>
          <br />
          {businessProducts?.map((product: Product, index: number) => (
            <div key={index} className="product-card">
              <img

                src={product?.img}
                alt={product?.name}
                className="product-image"
              />
              <div className="product-details">
                <span className="product-name">Name:{product?.name}</span>
                <span className="product-price">Price:{product?.price}$</span>
                <span className="product-quantity">
                  Quantity: {product?.quantity}
                </span>
                <span className="">Category: {product?.category}</span>
                <button aria-label={"EditProduct" + product?.name + "Button"}> <Link to={`${editProductLink(product?._id)}`}>Edit</Link>{" "}</button>
                <button aria-label={"DeleteProduct" + product?.name + "Button"}><Link to={`${deleteProductLink(product?._id)}`}>Delete</Link></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{businessProducts?.length} No products ,found for the logged-in business, Please Start Adding now</p>
      )}
    </div>
  );
}
