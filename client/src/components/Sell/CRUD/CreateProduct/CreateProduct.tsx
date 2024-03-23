import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Category } from "../../../../models/category";
import "./CreateProduct.scss";
import { categoriesService } from "../../../../services/categoryService";
import { productService } from "../../../../services/productService";
import { useAuth } from "../../../../context/AuthContext";

type FormData = {
  id: number;
  businessId: string;
  img: File | string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  parent: string;
  file: [];
};

export default function CreateProduct() {
  const { business } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    businessId: `${business?.businessId}`,
    img: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    parent: "",
    file: []
  });


  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || " ";
  const folderPath = "ebay-clone-mern-images/businesses/products";
  const uploadEndPoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  
  // Append folder path as a parameter
  const uploadEndPointWithFolder = `${uploadEndPoint}?folder=${folderPath}`;
 
 
  useEffect(() => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id.toString());
      formDataToSend.append("businessId", formData.businessId);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("img", formData.img as File);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("quantity", formData.quantity.toString());
      formDataToSend.append("category", formData.category);
      formDataToSend.append("parent", formData.parent);
      formDataToSend.append("file", formData.img);
      formDataToSend.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
    
      console.log("FormData to Send:", formDataToSend);

      const cloudinaryResponse = await fetch(uploadEndPointWithFolder, {
        method: "POST",
        body: formDataToSend,
      });
      if (!cloudinaryResponse.ok) {
        // Handle the error, throw an exception, or log the details
        const errorDetails = await cloudinaryResponse.json();
        console.error("Cloudinary API Error:", errorDetails);
        throw new Error("Failed to upload image to Cloudinary");
      }
      const cloudinaryData = await cloudinaryResponse.json();
      const cloudinaryImageUrl = cloudinaryData.secure_url;

      console.log("Cloudinary API Response:", cloudinaryData);

      const updatedFormData: FormData = {
        ...formData,
        img: cloudinaryImageUrl,
      };

      const data = await productService.createProduct(updatedFormData);
      console.log("Product created:", data);

      // Resetting the form after successful submission
      setFormData({
        id: 0,
        businessId: "",
        img: "",
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "",
        parent: "",
        file: [],
      });
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    if (
      fieldName === "img" &&
      e.target &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const inputElement = e.target as HTMLInputElement;
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: inputElement.files![0],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  return (
    <div className="create-product-container">
      <h2> Create Product</h2>
      <div className="create-product-form">
        <form onSubmit={handleSubmit}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            hidden
            type="text"
            value={business?.businessId}
            name="businessId"
            onChange={(e) => handleChange(e, "businessId")}
          />
          <label>
            Product Name:
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </label>
          <label>
            Product Image:
            <input
              name="img"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, "img")}
            />
          </label>
          <label>
            Product Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e, "description")}
            />
          </label>

          <label>
            Product Price:
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange(e, "price")}
            />
          </label>

          <label>
            Product Quantity:
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => handleChange(e, "quantity")}
            />
          </label>

          <label>
            Product Category:
            <select
              onChange={(e) => handleChange(e, "category")}
              name="category"
            >
              {Object.entries(groupedCategories).map(
                ([parent, categoryList]) => (
                  <optgroup label={parent} key={parent}>
                    {categoryList.map((category) => (
                      <option key={category?.name} value={category?.name}>
                        {category?.name}
                      </option>
                    ))}
                  </optgroup>
                )
              )}
            </select>
          </label>

          <button type="submit">Create Product</button>
        </form>
      </div>
    </div>
  );
}
