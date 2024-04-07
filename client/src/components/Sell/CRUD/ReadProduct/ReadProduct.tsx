import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { Product } from "../../../../models/product";
import "./ReadProduct.scss"; // Import your SCSS file for styling

export default function ReadProduct() {
  const { business } = useAuth();
  const [businessProducts, setBusinessProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchBusinessProducts = async () => {
      try {
        if (business && business.businessId) {
          const response = await axios.get<Product[]>(`http://localhost:5000/products/by-business/${business.businessId}`);
          setBusinessProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products by business ID:", error);
      }
    };

    fetchBusinessProducts();
  }, [business]);

  return (
    <div className="business-products-container">
      <h2>Business Products</h2>
      {businessProducts.length > 0 ? (
        <div className="product-list">
          {businessProducts.map((product: Product, index: number) => (
            <div key={index} className="product-card">
              <img src={product.img} alt={product.name} className="product-image" />
              <div className="product-details">
                <span className="product-name">{product.name}</span>
                <span className="product-price">${product.price}</span>
                <span className="product-quantity">Quantity: {product.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for the logged-in business.</p>
      )}
    </div>
  );
}
