import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FavoritesView from '../views/FavoritesView.vue';
import RecipeView from '../views/RecipeView.vue';
import AddRecipe from '../views/AddRecipe.vue';
import NotFoundView from '../views/NotFoundView.vue';
import EditRecipe from '../views/EditRecipe.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/add-recipe',
      name: 'addRecipe',
      component: AddRecipe,
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecipeView,
    },
    {
      path: '/edit-recipe/:id',
      name: 'editRecipe',
      component: EditRecipe,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
  ],
});

export default router;
