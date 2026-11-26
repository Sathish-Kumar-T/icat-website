import { createBrowserRouter, RouterProvider } from 'react-router';
import { BackToTop } from './components/BackToTop';
import { LanguageProvider } from './context/LanguageContext';
import { HomePage } from './pages/HomePage';
import {
  NotFoundPage,
  ProgramCampusPage,
  ProgramOverviewPage,
} from './pages/ProgramPages';

const router = createBrowserRouter([
  { path: '/', Component: HomePage },
  { path: '/programs/:programSlug', Component: ProgramOverviewPage },
  { path: '/programs/:programSlug/:campusPath', Component: ProgramCampusPage },
  { path: '*', Component: NotFoundPage },
]);

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <BackToTop />
    </LanguageProvider>
  );
}
