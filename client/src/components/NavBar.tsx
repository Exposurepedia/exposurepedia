import React from 'react';
import { Button, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { useAuthStatus } from '../api';
import {
  AppRouteLabels,
  authorizedNavBarRoutes,
  publicNavBarRoutes,
} from '../routes/appRoutes';

export function NavBar() {
  const { isAuthorized } = useAuthStatus();
  const routes = isAuthorized ? authorizedNavBarRoutes : publicNavBarRoutes;
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#646253' }}>
      {routes.map((page) => (
        <Link to={`${page}/`}>
          <Button>
            <Typography variant="h6">{AppRouteLabels[page]}</Typography>
          </Button>
        </Link>
      ))}
    </AppBar>
  );
}
