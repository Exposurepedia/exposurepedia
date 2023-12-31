import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './assets/theme';
import { store, persistor } from './util/redux/store';
import NotFoundPage from './NotFound/NotFoundPage';
import HomePage from './Home/HomePage';
import AdminDashboardPage from './AdminDashboard/AdminDashboardPage';
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from './util/routes';
import VerifyAccountPage from './Authentication/VerifyAccountPage';
import RegisterPage from './Authentication/RegisterPage';
import LoginPage from './Authentication/LoginPage';
import EmailResetPasswordPage from './Authentication/EmailResetPasswordPage';
import ResetPasswordPage from './Authentication/ResetPasswordPage';
import HierarchiesPage from './Hierarchy/HierarchiesPage';
import ModificationsPage from './Modifications/ModificationsPage';
import ViewHierarchyPage from './Hierarchy/ViewHierarchyPage';
import ApproveResourcesPage from './AdminControls/ApproveResourcesPage';
import FixLinksPage from './AdminControls/FixLinksPage';
import Exposurepedia from './Exposurepedia/ExposurepediaPage';
import SubmitResourcePage from './SubmitResource/SubmitResourcePage';
import ExposureItem from './ExposureItem/ExposureItemPage';
import NavBar from './components/NavBar';
import ContactPage from './Contact/ContactPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <Routes>
                  <Route path="/contact" element={<ContactPage />} />
                  {/* Routes accessed only if user is not authenticated */}
                  <Route element={<UnauthenticatedRoutesWrapper />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/verify-account/:token"
                      element={<VerifyAccountPage />}
                    />
                    <Route
                      path="/email-reset"
                      element={<EmailResetPasswordPage />}
                    />
                    <Route
                      path="/reset-password/:token"
                      element={<ResetPasswordPage />}
                    />
                    {/* <Route path="/home" element={<HomePage />} /> */}
                  </Route>
                  {/* Routes accessed only if user is authenticated */}
                  <Route element={<ProtectedRoutesWrapper />}>
                    {/* <Route path="/home" element={<HomePage />} /> */}
                    <Route
                      path="/submitresources"
                      element={<SubmitResourcePage />}
                    />
                    <Route path="/exposurepedia" element={<Exposurepedia />} />
                    <Route
                      path="/exposureitem/:id"
                      element={<ExposureItem />}
                      key={window.location.pathname}
                    />
                    <Route path="/hierarchies" element={<HierarchiesPage />} />
                    <Route
                      path="/modifications"
                      element={<ModificationsPage />}
                    />
                    <Route
                      path="/viewhierarchy"
                      element={<ViewHierarchyPage />}
                    />
                  </Route>
                  <Route element={<AdminRoutesWrapper />}>
                    <Route path="/users" element={<AdminDashboardPage />} />
                    <Route path="/approve" element={<ApproveResourcesPage />} />
                    <Route path="/broken" element={<FixLinksPage />} />
                  </Route>

                  {/* Route which redirects to a different page depending on if the user is an authenticated or not by utilizing the DynamicRedirect component */}
                  <Route path="/home" element={<HomePage />} />
                  <Route
                    path="/"
                    element={
                      <DynamicRedirect unAuthPath="/home" authPath="/home" />
                    }
                  />

                  {/* Route which is accessed if no other route is matched */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </CssBaseline>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
