import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

export default function SingleRecipe() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [recipe, setRecipe] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getRecipe() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.meals) {
          const {
            strMeal: name,
            strMealThumb: image,
            strArea: area,
            strCategory: category,
            strInstructions: instructions,
          } = data.meals[0];
          const newRecipe = {
            name,
            image,
            area,
            category,
            instructions,
          };
          setRecipe(newRecipe);
        } else {
          setRecipe(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getRecipe();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!recipe) {
    return <h2 className="section-title">no recipe to display</h2>;
  } else {
    const { name, image, area, category, instructions } = recipe;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name}></img>
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span> {name}
            </p>
            <p>
              <span className="drink-data">area :</span> {area}
            </p>
            <p>
              <span className="drink-data">category :</span> {category}
            </p>
            <p>
              <span className="drink-data">instructons :</span> {instructions}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
