import React, { useEffect } from "react";
import "./CategoryList.scss";
import { useNavigate } from "react-router-dom";
import { Nav, SearchBar } from "../..";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchCategories } from "../../../store/categorySlice";
import { Category } from "../../../models";

interface CategoryListProps {
  total: number;
}

const CategoryList: React.FC<CategoryListProps> = ({ total }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories} = useSelector((state: RootState) => state.categories);

  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // Group categories by their parent property
  const groupedCategories: { [parent: string]: Category[] } = {};
  categories.forEach((category) => {
    const parent = category?.parent || "Other";
    if (!groupedCategories[parent]) {
      groupedCategories[parent] = [];
    }
    groupedCategories[parent].push(category);
  });

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event?.target?.value;
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
      <Nav total={total} pageTitle=""/>
      <SearchBar />
      <div className="app-category__list">
        <h2>Categories</h2>
        <select
          title="selectCategoryHere"
          onChange={handleCategoryChange}
          name="handleCategoryList"
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
      </div>
    </>
  );
};

export default CategoryList;
