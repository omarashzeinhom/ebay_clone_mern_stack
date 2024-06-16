import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchCategories } from "../../../store/categorySlice";
import "./CategorySideBar.scss";
import { Category } from "../../../models/category";

interface Props {}

const CategorySideBar: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories, loading } = useSelector((state: RootState) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

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
        {loading ? (
          <p>Loading categories...</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default CategorySideBar;
