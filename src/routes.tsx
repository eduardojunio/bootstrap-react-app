import { Outlet, Route } from 'react-router-dom';

function Instructions() {
  return <h1>Empty routes. Update the src/routes.tsx file.</h1>;
}

export const routes = (
  <Route path="/" element={<Outlet />}>
    <Route path="/" element={<Instructions />} />
  </Route>
);
