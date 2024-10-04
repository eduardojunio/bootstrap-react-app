import { Outlet, Route } from 'react-router-dom';
import { RoutesInstructions } from './Shared/Components/RoutesInstructions/RoutesInstructions';

export const routes = (
  <Route path="/" element={<Outlet />}>
    <Route path="/" element={<RoutesInstructions filePath="src/routes.tsx" />} />
  </Route>
);
