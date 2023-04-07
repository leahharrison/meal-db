import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("s");
  const [recipes, setRecipes] = useState([]);

  const fetchMeals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { meals } = data;
      if (meals) {
        const newRecipes = meals.map((item) => {
          const { idMeal, strMeal, strCategory, strMealThumb, strArea } = item;
          return {
            id: idMeal,
            name: strMeal,
            category: strCategory,
            image: strMealThumb,
            area: strArea,
          };
        });
        setRecipes(newRecipes);
      } else {
        setRecipes([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    fetchMeals();
  }, [searchTerm, fetchMeals]);
  return (
    <AppContext.Provider
      value={{ loading, recipes, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
