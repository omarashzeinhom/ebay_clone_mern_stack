import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SearchBar.scss";
import { Category } from "../../models/category";
import { categoriesService } from "../../services/categoryService";
import { fetchProductsByName, setSearchQuery, setSearchResults } from "../../store/productSlice"; // Adjust the path to your slice file
import { AppDispatch, RootState } from "../../store/store";

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery);
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedCategoryValue = selectedIndex === 0 ? null : categories[selectedIndex - 1].name;
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
        const resultAction = await dispatch(fetchProductsByName(searchQuery));
        if (fetchProductsByName.fulfilled.match(resultAction)) {
          const searchResult = resultAction.payload;
          dispatch(setSearchResults(searchResult));
          navigate(`/search-results/${encodeURIComponent(searchQuery)}`);
        } else {
          console.error("Failed to fetch search results:", resultAction.payload);
        }
      } catch (error) {
        console.error("Error dispatching search action:", error);
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
        title="leftCategories"
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
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
        <button
          aria-label="SearchBarButton"
          className="app__searchbar-searchBtn"
          id="searchBtn"
          name="searchButton"
          onClick={handleSearch}
        >
          <i className="app__searchbar-searchicon">⌕</i>
        </button>
        <select
          title="app__searchbar-form-dropDown"
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