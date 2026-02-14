import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import ToolkitListPage from './pages/Toolkit/ToolkitListPage';
import ToolkitDetailPage from './pages/Toolkit/ToolkitDetailPage';
import LibraryListPage from './pages/Library/LibraryListPage';
import TopicDetailPage from './pages/Library/TopicDetailPage';
import CheckInPage from './pages/CheckIn/CheckInPage';
import CheckInDetailPage from './pages/CheckIn/CheckInDetailPage';
import JournalPage from './pages/Journal/JournalPage';
import SavedPage from './pages/Saved/SavedPage';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const toolkitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/toolkit',
  component: ToolkitListPage,
});

const toolkitDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/toolkit/$id',
  component: ToolkitDetailPage,
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: LibraryListPage,
});

const topicDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library/$id',
  component: TopicDetailPage,
});

const checkInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/check-in',
  component: CheckInPage,
});

const checkInDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/check-in/$id',
  component: CheckInDetailPage,
});

const journalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journal',
  component: JournalPage,
});

const savedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/saved',
  component: SavedPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  toolkitRoute,
  toolkitDetailRoute,
  libraryRoute,
  topicDetailRoute,
  checkInRoute,
  checkInDetailRoute,
  journalRoute,
  savedRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
