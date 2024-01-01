import { useEffect, useState } from "react";
import { Category } from "../../../../models/category";
import "./CreateProduct.scss";
import { categoriesService } from "../../../../services/categoryService";
import { productService } from "../../../../services/productService";

export default function CreateProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // Fetch categories from the server when the component mounts
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategories(data);
        console.log(`fetchCategories data is -->${data}`);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const groupedCategories: { [parent: string]: Category[] } = {};
  categories.forEach((category) => {
    const parent = category?.parent || "Other";
    if (!groupedCategories[parent]) {
      groupedCategories[parent] = [];
    }
    groupedCategories[parent].push(category);
  });

  const CreateProductForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      category: '',
      parent : '',
      // Add other form fields as needed
    });

    const handleSubmit = async () => {
     try {
      setLoading(true);
      setError(null);

      // Add form validation here if needed

      const data = await productService.createProduct({
        _id: "",
        id: 0,
        quantity: formData.quantity,
        name: formData.name,
        img: "", // Add img property if needed
        price: formData.price,
        category: formData.category,
        parent: "",
        // Add businessId if needed
      });

      // Handle the response or perform additional actions
      console.log("Product created:", data);
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create the product. Please try again."); // Set an appropriate error message
    } finally {
      setLoading(false);
    }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
  
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
    return (
      <form onSubmit={handleSubmit}>
        {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Product Name:
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Product Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Product Price:
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
      </label>

      <label>
        Product Quantity:
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>

      <label>
        Product Category:
        <select onChange={handleChange} name="handleCategoryList">
          {Object.entries(groupedCategories).map(([parent, categoryList]) => (
            <optgroup label={parent} key={parent}>
              {categoryList.map((category) => (
                <option
                  key={category.name}
                  value={`/category/${encodeURIComponent(category.name)}`}
                >
                  {category.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <button type="submit">Create Product</button>
    </form>
    );
  };

  return (
    <div className="create-product-container">
      <h2> Create Product</h2>
      <div className="create-product-form">
        <CreateProductForm />
      </div>
    </div>
  );
}
