import { Alert, Button, Grid, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { loginUser } from './api';
import { TextHookForm } from '../../components';

export const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .passthrough();

export default function LoginPage() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState<string>();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const user = await loginUser(values.email, values.password);
      // dispatchUser(user.email!, user.firstName!, user.lastName!, user.admin!);
      console.log('user', user);
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError(JSON.stringify(e.message));
      }
    }

    // try {
    //   const res = await getData('exposure/filterOptions');
    //   dispatchFilters(res.data);
    //   window.location.reload();
    //   navigate('/home');
    // } catch (e: any) {
    //   setShowError('alert', true);
    //   setErrorMessage('alert', e.message);
    // }
  });

  return (
    <form
      style={{ position: 'relative' }}
      onSubmit={async (e) => {
        onSubmit(e);
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={7}
      >
        <Grid item>
          <Typography variant="h2">Login</Typography>
        </Grid>

        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <TextHookForm control={control} name="email" />
          </Grid>
          <Grid item>
            <TextHookForm control={control} name="password" type="password" />
          </Grid>
        </Grid>

        <Grid container item direction="column" spacing={3} alignItems="center">
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Button variant="contained" type="submit">
                Log in
              </Button>
            </Grid>
            <Grid item>
              {error && (
                <Alert severity="error">Error logging in: {error}</Alert>
              )}
            </Grid>
          </Grid>

          <Grid item>Forgot password?</Grid>
        </Grid>
      </Grid>
    </form>
  );
}
