// SearchBar.tsx

import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "./SearchBar.scss";
import { categoryData, Category } from "../../utils/searchBarConstants";

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedCategory(
      selectedIndex === 0 ? null : categoryData[selectedIndex - 1]
    );
  };

  const isMobile = window.innerWidth <= 500; // Check if the screen width is less than or equal to 500px

  // Group categories by parent
  const groupedCategories: { [key: string]: Category[] } = {};
  categoryData.forEach((category) => {
    if (category.parent) {
      if (!groupedCategories[category.parent]) {
        groupedCategories[category.parent] = [];
      }
      groupedCategories[category.parent].push(category);
    } else {
      if (!groupedCategories["Others"]) {
        groupedCategories["Others"] = [];
      }
      groupedCategories["Others"].push(category);
    }
  });

  return (
    <div className="app__searchbar">
      <a href="/">
        <img
          className="app__searchbar-logo"
          src="/ebaylogo.png"
          alt="searchbarlogo"
        />
      </a>
      <select onChange={handleChange} className="app__searchbar-form-dropDown">
        {!isMobile && <option hidden>All Categories</option>}
        {Object.entries(groupedCategories).map(([parent, categories]) => (
          <optgroup key={parent} label={parent}>
            {categories.map((category: Category, index: number) => (
              <option key={index} value={category.name}>
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
            {categoryData.map((category: Category, index: number) => (
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
