// CategoryList.tsx

import React from "react";
import { Category } from "../../utils/searchBarConstants";
import "./CategoryList.scss";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  // Organize categories by parent
  const groupedCategories: { [parent: string]: Category[] } = {};

  categories.forEach((category) => {
    // Ensure that category.parent is not undefined
    const parent = category.parent || "Other";

    if (!groupedCategories[parent]) {
      groupedCategories[parent] = [];
    }
    groupedCategories[parent].push(category);
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUrl = event.target.value;
    if (selectedUrl) {
      window.location.href = selectedUrl;
    }
  };

  return (
    <div className="app__category-List">
      <h2>Categories</h2>
      <select onChange={handleCategoryChange}>
        {Object.entries(groupedCategories).map(([parent, categoryList]) => (
          <optgroup label={parent} key={parent}>
            {categoryList.map((category) => (
              <option key={category.name} value={`/category/${encodeURIComponent(category.name)}`}>
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
