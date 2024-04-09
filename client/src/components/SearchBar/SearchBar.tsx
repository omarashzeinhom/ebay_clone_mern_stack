import React, { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "./SearchBar.scss";
import { useNavigate } from "react-router-dom";
import { Category } from "../../models/category";
import { categoriesService } from "../../services/categoryService";
import { productService } from "../../services/productService";
import { useProductContext } from "../../context/ProductContext";

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setSearchResults,searchQuery,setQuery } = useProductContext();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedCategoryValue =
      selectedIndex === 0 ? null : categories[selectedIndex - 1].name;
    setSelectedCategory(selectedCategoryValue);

    if (selectedCategoryValue) {
      navigate(`/category/${encodeURIComponent(selectedCategoryValue)}`);
    }
  };

  const isMobile = window.innerWidth <= 500;

  const groupedCategories: { [key: string]: Category[] } = {};
  categories.forEach((category) => {
    const parent = category?.parent || "Others";
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

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const searchResult = await productService.getProductsByName(searchQuery);
        setSearchResults(searchResult ? [searchResult] : []); // Set search results as an array, even if empty
        navigate(`/search-results/${encodeURIComponent(searchQuery)}`); // Navigate to search results page with query parameter
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div className="app__searchbar">
      <a href="/">
        <img
          className="app__searchbar-logo"
          src="/ebaylogo.png"
          alt="searchbarlogo"
          loading="lazy"
        />
      </a>
      <select
        id="categories__left"
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

      <div className="app__searchbar-form" onSubmit={handleSearch}>
        <div className="app__searchbar-formSearch">
          <input
            type="text"
            name="searchbar"
            className="app__searchbar-input"
            id="app__search"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="app__searchbar-searchBtn"
          id="searchBtn"
          onClick={handleSearch}
        >
          <HiMagnifyingGlass className="app__searchbar-searchicon" />
        </button>
        <select
          onChange={handleChange}
          className={`app__searchbar-form-dropDown ${
            isMobile ? "app__searchbar-form-dropDown-mobile" : ""
          }`}
          id="categories__right"
        >
          {!isMobile && <option hidden>All Categories</option>}
          {categories.map((category: Category, index: number) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
