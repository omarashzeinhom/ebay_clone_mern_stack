import React from "react";
import { Category } from "../../utils/searchBarConstants";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./CategoryList.scss";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const groupedCategories: { [parent: string]: Category[] } = {};
  categories.forEach((category) => {
    const parent = category.parent || "Other";
    if (!groupedCategories[parent]) {
      groupedCategories[parent] = [];
    }
    groupedCategories[parent].push(category);
  });

  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    // Update the URL using useNavigate
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
        value={window.location.pathname} // Use window.location.pathname to get the current URL
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

      {/**
         * DEBUG
         * {window.location.pathname !== "/" && (
        <p>Selected Category: {decodeURIComponent(window.location.pathname.replace("/category/", ""))}</p>
      )}
         */}
    </div>
  );
};

export default CategoryList;
