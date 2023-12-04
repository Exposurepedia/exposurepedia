import { Grid, Typography } from '@mui/material';
import React from 'react';

export const PageShell = ({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={7}
      sx={{ mt: 3 }}
    >
      <Grid item>
        <Typography variant="h2">{header}</Typography>
      </Grid>
      {children}
    </Grid>
  );
};
