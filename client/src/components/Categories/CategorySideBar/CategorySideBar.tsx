import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesService } from "../../../services/categoryService";
import "./CategorySideBar.scss";
import { Category } from "../../../models/category";

interface Props {}

const CategorySideBar: React.FC<Props> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="category-sidebar">
      <div className="category-sidebar__header">
        <h4>Categories</h4>
      </div>
      <div className="category-sidebar__content">
        <ul className="category-sidebar__list">
          {categories.map((category: Category) => (
            <li
              key={category.name}
              className={`category-sidebar__item ${selectedCategory === category.name ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySideBar;
