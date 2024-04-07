import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Product } from "../../../models/product";

export default function ReadProduct() {
  const { business } = useAuth();
  //const businessId = business?.businessId;
  const [businessProducts, setBusinessProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products by business ID when component mounts
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
    <div>
      <h2>Business Products</h2>
      {businessProducts.length > 0 ? (
        <div>
          {businessProducts.map((product: Product, index: number) => (
            <div key={index}>
              <span>ID: {product.id}</span>
              <span>Business ID: {product.businessId}</span>
              <span>Name: {product.name}</span>
              <span>Image: {product.img}</span>
              <span>Parent: {product.parent}</span>
              <span>Category: {product.category}</span>
              <span>File: {product.file}</span>
              <span>Price: {product.price}</span>
              <span>Quantity: {product.quantity}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for the logged-in business.</p>
      )}
    </div>
  );
}
