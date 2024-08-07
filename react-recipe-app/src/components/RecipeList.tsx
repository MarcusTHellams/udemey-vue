import { Link } from 'react-router-dom';

import { type Recipe } from '@/stores';

export const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <>
      {recipes.length ? (
        <nav>
          <ul className="p-0">
            {recipes.map((recipe) => {
              return (
                <li className="list-none" key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : (
        <div className="text-gray-500">No Recipes Found!</div>
      )}
    </>
  );
};
