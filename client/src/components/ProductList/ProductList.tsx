import React, { useState, useEffect } from "react";
import { Product } from "../../utils/searchBarConstants";
import { useNavigate } from "react-router-dom";
import { productService } from "../../services/productService";

interface ProductListProps {
  // Assuming there's an endpoint like '/api/products' that returns products
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the server when the component mounts
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      navigate(`/category/${encodeURIComponent(category)}`);
    } else {
      navigate("/");
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
