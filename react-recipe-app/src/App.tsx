import { NavLink, Outlet } from 'react-router-dom';

import { cn } from '@/lib/utils';

const getClassesForNavLinks = ({ isActive }: { isActive: boolean }) => {
  return cn(
    'not-prose text-gray-800 border-b-2 border-blue-500 mx-1.5 sm:mx-6',
    {
      'border-green-500': isActive,
    },
  );
};

function App() {
  return (
    <>
      <nav className="bg-white shadow-lg">
        <ul className="not-prose container flex items-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <li>
            <NavLink
              to="/"
              className={getClassesForNavLinks}
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={getClassesForNavLinks}
            >
              favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-recipe"
              className={getClassesForNavLinks}
            >
              Add Recipe
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
