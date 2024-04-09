import { useAuth } from "../../../../context/AuthContext";
import { Product } from "../../../../models/product";
import "./DeleteProduct.scss"; // Import the styles

export default function DeleteProduct() {
  const { business } = useAuth();

  // Assuming businesssProductMock is fetched from some API call initially
  const businesssProductMock: Product[] = [
    {
      _id: "",
      id: 0,
      quantity: 0,
      name: "Product Mock",
      description: "",
      img: "mockurl",
      price: 20,
      category: "Category Mock",
      parent: "Parent Mock",
      businessId: business?.businessId || "", // Default value, it will be Deleted later
    },
  ];

  // Filter products based on businessId
  const filteredProducts = businesssProductMock.filter(
    (product) => product.businessId === business?.businessId
  );

  const handleDelete = (productId: string) => {
    // Implement delete functionality here
    console.log(`Deleting product with ID: ${productId}`);
  };

  return (
    <div className="delete-product-container">
      <h2>Delete Product</h2>
      {filteredProducts.map((product) => (
        <div className="product-item" key={product._id}>
          <p>ID: {product.id}</p>
          <p>Name: {product.name}</p>
          <p>Image URL: {product.img}</p>
          <p>Parent: {product.parent}</p>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <button
            className="delete-button"
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
