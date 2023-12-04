import React from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { useAuthStatus } from '../api';
import {
  AppRouteLabels,
  appRoutes,
  authorizedNavBarRoutes,
  publicNavBarRoutes,
} from '../routes/appRoutes';
import { PopupMenu } from './PopupMenu';

export function NavBar() {
  const { isAuthorized } = useAuthStatus();
  const routes = isAuthorized ? authorizedNavBarRoutes : publicNavBarRoutes;
  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
    >
      <Grid
        container
        direction="row"
        flexWrap="nowrap"
        justifyContent="space-between"
        sx={{ px: 2, py: 1 }}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent="flex-start"
          direction="row"
          flexWrap="nowrap"
          spacing={2}
        >
          {routes.map((page) => (
            <Grid item key={page}>
              <Link to={`${page}/`}>
                <Button>
                  <Typography
                    variant="body1"
                    sx={(theme) => ({
                      color: theme.palette.common.white,
                      textTransform: 'none',
                    })}
                  >
                    {AppRouteLabels[page]}
                  </Typography>
                </Button>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Grid item container justifyContent="flex-end" spacing={2}>
          {isAuthorized ? (
            <>
              <Grid item>
                <IconButton>
                  <HelpOutlineOutlinedIcon
                    sx={(theme) => ({ color: theme.palette.common.white })}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <PopupMenu
                  menuItems={[
                    { id: 'logout', text: 'Logout', Icon: LogoutIcon },
                  ]}
                  onSelect={(type) => {
                    if (type === 'logout') {
                      // NEED TO IMPLEMENT THIS NEXT
                      //
                    }
                  }}
                >
                  {(handleClick) => (
                    <IconButton onClick={handleClick}>
                      <PersonIcon
                        sx={(theme) => ({ color: theme.palette.common.white })}
                      />
                    </IconButton>
                  )}
                </PopupMenu>
              </Grid>
            </>
          ) : (
            <Grid container item alignItems="center" justifyContent="flex-end">
              <Grid item>
                <Link to={`${appRoutes.signup}/`}>
                  <Button>
                    <Typography
                      variant="body1"
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                        textTransform: 'none',
                      })}
                    >
                      Sign up
                    </Typography>
                  </Button>
                </Link>
              </Grid>
              <Grid item>or</Grid>
              <Grid item>
                <Link to={`${appRoutes.login}/`}>
                  <Button>
                    <Typography
                      variant="body1"
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                        textTransform: 'none',
                      })}
                    >
                      Log in
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
}
