import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "./UpdateProduct.scss";

interface Product {
  _id: string;
  id: number;
  quantity: number;
  name: string;
  img: string;
  price: number;
  category: string;
  parent: string;
  businessId: string;
  file: string[]; // Assuming it's an array of strings
}

export default function UpdateProduct() {
  const { business } = useAuth();

  // Assuming businesssProductMock is fetched from some API call initially
  const businesssProductMock: Product[] = [
    {
      _id: "",
      id: 0,
      quantity: 0,
      name: "Product Mock",
      img: "mockurl",
      price: 20,
      category: "Category Mock",
      parent: "Parent Mock",
      businessId: business?.businessId || "", // Default value, it will be updated later
      file: [],
    },
  ];

  // Filter products based on businessId
  const filteredProducts = businesssProductMock.filter(
    (product) => product.businessId === business?.businessId
  );

  const [updatedProducts, setUpdatedProducts] = useState<Product[]>(filteredProducts);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    propertyName: keyof Product
  ) => {
    const newProducts = [...updatedProducts];
    newProducts[index] = {
      ...newProducts[index],
      [propertyName]: e.target.value,
    };
    setUpdatedProducts(newProducts);
  };

  const handleSubmit = () => {
    console.log("Updated Products:", updatedProducts);
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <form className="product-form-container">
        {updatedProducts.map((product, index) => (
          <div className="product-item" key={index}>
            <label className="product-label">
              ID:
              <input
                className="product-input"
                type="text"
                value={product.id}
                onChange={(e) => handleInputChange(e, index, "id")}
              />
            </label>
            <label className="product-label">
              Name:
              <input
                className="product-input"
                type="text"
                value={product.name}
                onChange={(e) => handleInputChange(e, index, "name")}
              />
            </label>
            <label className="product-label">
              Image URL:
              <input
                className="product-input"
                type="text"
                value={product.img}
                onChange={(e) => handleInputChange(e, index, "img")}
              />
            </label>
            <label className="product-label">
              Parent:
              <input
                className="product-input"
                type="text"
                value={product.parent}
                onChange={(e) => handleInputChange(e, index, "parent")}
              />
            </label>
            <label className="product-label">
              Category:
              <input
                className="product-input"
                type="text"
                value={product.category}
                onChange={(e) => handleInputChange(e, index, "category")}
              />
            </label>
            <label className="product-label">
              File (comma separated):
              <input
                className="product-input"
                type="text"
                value={product.file.toString()}
                onChange={(e) => handleInputChange(e, index, "file")}
              />
            </label>
            <label className="product-label">
              Price:
              <input
                className="product-input"
                type="text"
                value={product.price.toString()}
                onChange={(e) => handleInputChange(e, index, "price")}
              />
            </label>
            <label className="product-label">
              Quantity:
              <input
                className="product-input"
                type="text"
                value={product.quantity.toString()}
                onChange={(e) => handleInputChange(e, index, "quantity")}
              />
            </label>
          </div>
        ))}
      </form>
      <button className="update-button" onClick={handleSubmit}>Update Product</button>
    </div>
  );
  
}
