import React from "react";
import { Category } from "../../utils/searchBarConstants"; 

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <a href={`/category/${encodeURIComponent(category.name)}`}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
