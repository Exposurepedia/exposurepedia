import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { theme } from './assets/theme';
import { NavBar } from './components';
import AboutPage from './features/about';
import ContactPage from './features/contact';
import ExposurepediaPage from './features/exposurepedia';
import HierarchiesPage from './features/hierarchies';
import ResourcesPage from './features/resources';
import HomePage from './features/home';
import LoginPage from './features/login';
import SignupPage from './features/signup';
import { appRoutes } from './routes';
import { QueryClientProvider } from 'react-query';
import { appQueryClient } from './lib';

const AppShell = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route path={`/${appRoutes.home}/*`} element={<HomePage />} />
        <Route path={`/${appRoutes.about}/*`} element={<AboutPage />} />
        <Route path={`/${appRoutes.contact}/*`} element={<ContactPage />} />

        <Route path={`/${appRoutes.login}/*`} element={<LoginPage />} />
        <Route path={`/${appRoutes.signup}/*`} element={<SignupPage />} />

        <Route
          path={`/${appRoutes.exposurepedia}/*`}
          element={<ExposurepediaPage />}
        />
        <Route
          path={`/${appRoutes.hierarchies}/*`}
          element={<HierarchiesPage />}
        />
        <Route path={`/${appRoutes.resources}/*`} element={<ResourcesPage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={appQueryClient}>
            <CssBaseline>
              <AppRoutes />
            </CssBaseline>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

// <Routes>
// <Route path="/contact" element={<ContactPage />} />
// {/* Routes accessed only if user is not authenticated */}
// <Route element={<UnauthenticatedRoutesWrapper />}>
//   <Route path="/login" element={<LoginPage />} />
//   <Route path="/register" element={<RegisterPage />} />
//   <Route
//     path="/verify-account/:token"
//     element={<VerifyAccountPage />}
//   />
//   <Route
//     path="/email-reset"
//     element={<EmailResetPasswordPage />}
//   />
//   <Route
//     path="/reset-password/:token"
//     element={<ResetPasswordPage />}
//   />
//   {/* <Route path="/home" element={<HomePage />} /> */}
// </Route>
// {/* Routes accessed only if user is authenticated */}
// <Route element={<ProtectedRoutesWrapper />}>
//   {/* <Route path="/home" element={<HomePage />} /> */}
//   <Route
//     path="/submitresources"
//     element={<SubmitResourcePage />}
//   />
//   <Route path="/exposurepedia" element={<Exposurepedia />} />
//   <Route
//     path="/exposureitem/:id"
//     element={<ExposureItem />}
//     key={window.location.pathname}
//   />
//   <Route path="/hierarchies" element={<HierarchiesPage />} />
//   <Route path="/modifications" element={<ModificationsPage />} />
//   <Route path="/viewhierarchy" element={<ViewHierarchyPage />} />
// </Route>
// <Route element={<AdminRoutesWrapper />}>
//   <Route path="/users" element={<AdminDashboardPage />} />
//   <Route path="/approve" element={<ApproveResourcesPage />} />
//   <Route path="/broken" element={<FixLinksPage />} />
// </Route>

// {/* Route which redirects to a different page depending on if the user is an authenticated or not by utilizing the DynamicRedirect component */}
// <Route path="/home" element={<HomePage />} />
// <Route
//   path="/"
//   element={
//     <DynamicRedirect unAuthPath="/home" authPath="/home" />
//   }
// />

// {/* Route which is accessed if no other route is matched */}
// <Route path="*" element={<NotFoundPage />} />
// </Routes>
