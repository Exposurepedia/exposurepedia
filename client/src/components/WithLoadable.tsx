/**
 *
 * WithLoadable
 *
 */

import React, { lazy } from 'react';
import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { anObject } from '../types';

const LazyLoadFailure: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={1}>
      <Typography variant="h5">Something went wrong...</Typography>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => window.location.reload()}
      >
        Reload
      </Button>
    </Box>
  );
};

function withLoadable<Props = anObject>(
  factory: Parameters<typeof lazy>[0],
): React.LazyExoticComponent<React.ComponentType<Props>> {
  return lazy(async () => {
    try {
      return await factory();
    } catch (e) {
      console.error('Failed to fetch loadable component. See error below 🔻');
      console.error(e);
      return {
        default: LazyLoadFailure,
      };
    }
  });
}

export default withLoadable;
