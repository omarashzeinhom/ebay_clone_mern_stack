import { useEffect, useState } from "react";
import { Category } from "../../../../models/category";
import "./CreateProduct.scss";
import { categoriesService } from "../../../../services/categoryService";



export default function CreateProduct({}) {
  const [categories, setCategories] = useState<Category[]>([]);


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

    const handleSubmit = () => {
      console.log("");
      return null;
    };

    const handleChange = () => {};

 

    return (
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Product Image :
          <input
            name="image"
            type="file"
            onChange={(e) => handleChange}
          />
        </label>

        <label>
          {" "}
          Product Name :
          <input
            name="name"
            className=""
            type="text"
            onChange={(e) => handleChange}
          />
        </label>

        <label>
          {" "}
          Product Description :
          <textarea
            name="description"
            className=""
            onChange={(e) => handleChange}
          />
        </label>

        <label>
          {" "}
          Product Price :
          <input
            name="price"
            className=""
            type="number"
            onChange={(e) => handleChange}
          />
        </label>

        <label>
          {" "}
          Product Quantity :
          <input
            name="quantity"
            className=""
            type="number"
            onChange={(e) => handleChange}
          />
        </label>


        <label>
          {" "}
          {Object.entries(groupedCategories).map(([parent, categoryList])=> (
                 <input
                 name="parent"
                 key={parent}
                 value={`${parent}`}
                 type="text"
                 hidden
                 onChange={(e) => handleChange}

               />
             
          ))}
      
        </label>
      
        <label>
          {" "}
          Product Category :
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


        <button type="submit"> Create Product </button>
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
