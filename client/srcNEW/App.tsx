import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { theme } from './assets/theme';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ThemeProvider theme={theme}>
          <CssBaseline>hello</CssBaseline>
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
