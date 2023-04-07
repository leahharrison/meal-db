import React from "react";
import RecipeList from "../components/RecipeList";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <main>
      <SearchForm />
      <RecipeList />
    </main>
  );
}
