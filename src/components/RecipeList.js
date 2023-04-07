import React from "react";
import Recipe from "./Recipe";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

export default function RecipeList() {
  const { recipes, loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (recipes.length < 1) {
    return (
      <h2 className="section-title">no recipes matched your search criteria</h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">recipes</h2>
      <div className="cocktails-center">
        {recipes.map((item) => {
          return <Recipe key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
