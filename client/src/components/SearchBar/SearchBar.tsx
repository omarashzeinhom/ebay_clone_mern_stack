// SearchBar.tsx

import React, { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "./SearchBar.scss";
import { useNavigate } from "react-router-dom";
import { Category } from "../../models/category";
import { categoriesService } from "../../services/categoryService";

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedCategoryValue = selectedIndex === 0 ? null : categories[selectedIndex - 1].name;
    setSelectedCategory(selectedCategoryValue);
    
    // Navigate to the selected category
    if (selectedCategoryValue) {
      navigate(`/category/${encodeURIComponent(selectedCategoryValue)}`);
    }
  };

  const isMobile = window.innerWidth <= 500;

  const groupedCategories: { [key: string]: Category[] } = {};
  categories.forEach((category) => {
    const parent = category?.parent || "Others"; // Use the parent category, or default to "Others"
    if (!groupedCategories[parent]) {
      groupedCategories[parent] = [];
    }
    groupedCategories[parent].push(category);
  });
  

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


  return (
    <div className="app__searchbar">
      <a href="/">
        <img
          className="app__searchbar-logo"
          src="/ebaylogo.png"
          alt="searchbarlogo"
        />
      </a>
      <select
  id="categories"
  onChange={handleChange}
  className="app__searchbar-form-dropDown"
  value={selectedCategory || ""}
>
  {!isMobile && <option hidden>Shop by category</option>}
  {Object.entries(groupedCategories).map(([parent, categories]) => (
    <optgroup key={parent} label={parent}>
      {categories.map((category: Category, index: number) => (
        <option key={index} value={encodeURIComponent(category.name)}>
          {category.name}
        </option>
      ))}
    </optgroup>
  ))}
</select>

      <form className="app__searchbar-form">
        <div className="app__searchbar-formSearch">
          <input
            type="search"
            name="searchbar"
            className="app__searchbar-input"
            placeholder="Search for anything"
          />
          <select
            onChange={handleChange}
            className={`app__searchbar-form-dropDown ${
              isMobile ? "app__searchbar-form-dropDown-mobile" : ""
            }`}
            id="categories"
          >
            {!isMobile && <option hidden>All Categories</option>}
            {categories.map((category: Category, index: number) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="app__searchbar-searchBtn" id="searchBtn">
          <HiMagnifyingGlass className="app__searchbar-searchicon" />
        </button>
      </form>
    </div>
  );
}
