import React, { useState, useEffect, useRef } from "react";
import "./CategoryList.scss";
import { useNavigate } from "react-router-dom";
import { Nav, SearchBar } from "../..";
import { Category } from "../../../models/category";
import { categoriesService } from "../../../services/categoryService";

interface CategoryListProps {
  categories: Category[];
  total: number;
}

const CategoryList: React.FC<CategoryListProps> = ({ total }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();
  const categoryListRef = useRef<HTMLSelectElement>(null);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const data = await categoriesService.getAllCategories();
      setCategories((prevCategories) => [...prevCategories, ...data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    // Fetch initial categories
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!loadingCategories && categoryListRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchCategories();
        }
      });

      observer.observe(categoryListRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [loadingCategories, categoryListRef.current]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    const categoryName = decodeURIComponent(
      selectedCategory.replace("/category/", "")
    );

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
        <select
          title="selectCategoryHere"
          onChange={handleCategoryChange}
          ref={categoryListRef}
        >
          {categories.map((category) => (
            <option
              key={category.name}
              value={`/category/${encodeURIComponent(category.name)}`}
            >
              {category.name}
            </option>
          ))}
          {loadingCategories && <option>Loading more categories...</option>}
        </select>
      </div>
    </>
  );
};

export default CategoryList;
