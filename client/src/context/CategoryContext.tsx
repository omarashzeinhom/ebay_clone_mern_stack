// CategoryContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Category } from '../models/category';
import { categoriesService } from '../services/categoryService';

interface CategoryContextProps {
  categoryData: Category[];
  setCategoryData: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategoryData(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryData, setCategoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
