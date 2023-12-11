import React, { useState } from "react";
import { Product } from "../../utils/searchBarConstants";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update the URL using useNavigate
    if (category) {
      navigate(`/category/${encodeURIComponent(category)}`);
    } else {
      navigate("/"); // Navigate to the home page if no category is selected
    }
  };

  return (
    <div>
      <h2>Products</h2>

      {/* UI to change the selected category */}
      <div>
        <button onClick={() => handleCategoryChange("")}>
        All Categories
        </button>
        {/* Add more buttons or UI elements for other categories */}
      </div>

      <ul>
        {products.map((product) => (
          /* Check if no category is selected or if the product matches the selected category */
          (!selectedCategory || product.parent === selectedCategory) && (
            <li key={product.name}>
              <div>
                <img src={product.img} alt={product.name} />
                <p>{product.name}</p>
                <p>${product.price}</p>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
