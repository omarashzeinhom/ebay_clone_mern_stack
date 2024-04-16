import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./CreateProduct.scss";
import { categoriesService,productService } from "../../../../services/";
import { useBusinessAuth } from "../../../../context/";
import { bussinessProductsFullUploadUri } from "../../../../utilities/constants";
import { Category ,CreateProductFormData } from "../../../../models/";

export default function CreateProduct() {
  const { business } = useBusinessAuth();
  //DEBUG (Make sure businessId is passed to the useAuth Hook as a business object)
  //console.log(`busines----->${JSON.stringify(business)}`)
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateProductFormData>({
    id: 0,
    businessId: `${business?.businessId}`,
    img: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    parent: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategories(data);
        //console.log(`fetchCategories data is -->${data}`);
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

      // Upload the image file to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", formData.img as File);
      cloudinaryFormData.append(
        "upload_preset",
        `${process.env.REACT_APP_CLODUINARY_BUSINESS_PRODUCTS_UPLOAD_PRESET}`
      );

      const cloudinaryResponse = await fetch(bussinessProductsFullUploadUri, {
        method: "POST",
        body: cloudinaryFormData,
      });

      if (!cloudinaryResponse.ok) {
        const errorDetails = await cloudinaryResponse.json();
        console.error("Cloudinary API Error:", errorDetails);
        throw new Error("Failed to upload image to Cloudinary");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const cloudinaryImageUrl = cloudinaryData.secure_url;

      // Store the Cloudinary URL in MongoDB
      const productData = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        img: cloudinaryImageUrl, // Store the Cloudinary URL here
        price: formData.price,
        quantity: formData.quantity,
        category: formData.category,
        parent: formData.parent,
        businessId: formData.businessId,
      };

      console.log("productData====>" + productData);

      // Call your backend service to store the product data in MongoDB
      const data = await productService.createProduct({
        id: formData.id,
        name: formData.name,
        img: cloudinaryImageUrl,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        category: formData.category,
        parent: formData.parent,
        businessId: formData.businessId,
      });
      console.log("Product created:", data);

      // Resetting the form after successful submission
      setFormData((prevState) => ({
        ...prevState,
        img: "", // Reset img property to an empty string
      }));
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
      {business?.businessId && (
        <>
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
                  placeholder="Upload Product Image Here"
                  name="img" // need to pass another hidden input as string when full product is successfull
                  type="file"
                  accept="image/*"
                  //disabled={true}
                  onChange={(e) => handleChange(e, "img")}
                />
                <input
                  name="" // need to pass another hidden input as string when full product is successfull
                  type="text"
                  accept="image/*"
                  hidden={true}
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

              <button aria-label="CreateProductButton" type="submit">
                Create Product
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
