import React, { useState, useEffect } from "react";
import "./CategorySideBar.scss";
import { useNavigate } from "react-router-dom";
import { Nav, SearchBar } from "../..";
import { Category } from "../../../models/category";
import { categoriesService } from "../../../services/categoryService";

interface CategorySideBarProps {
  // Assuming there's an endpoint like '/categories' that returns categories
  categories: Category[];
  total: number;
}

const CategorySideBar: React.FC<CategorySideBarProps> = ({ total }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();

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

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    // console.log("Selected Category:", selectedCategory);

    // Extract only the category name from the full path
    const categoryName = decodeURIComponent(
      selectedCategory.replace("/category/", "")
    );

    // console.log(categoryName);

    if (categoryName) {
      navigate(`/category/${encodeURIComponent(categoryName)}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <Nav total={total} />
      <SearchBar />
      <div className="app-category__list">
        <h2>Categories</h2>
        <select onChange={handleCategoryChange} name="handleCategoryList">
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
      </div>
    </>
  );
};

export default CategorySideBar;
