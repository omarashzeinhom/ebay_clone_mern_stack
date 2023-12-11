import React, { useState, useEffect } from "react";
import { Category } from "../../models/category";
import { useNavigate } from "react-router-dom";
import { categoriesService } from "../../services/categoryService";

interface CategoryListProps {
  // Assuming there's an endpoint like '/categories' that returns categories
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the server when the component mounts
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const groupedCategories: { [parent: string]: Category[] } = {};
  categories.forEach((category) => {
    const parent = category.parent || "Other";
    if (!groupedCategories[parent]) {
      groupedCategories[parent] = [];
    }
    groupedCategories[parent].push(category);
  });

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(selectedCategory);
    }
  };

  return (
    <div className="app__category-List">
      <h2>Categories</h2>
      <select
        onChange={handleCategoryChange}
        name="handleCategoryList"
        value={window.location.pathname}
      >
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
  );
};

export default CategoryList;
