import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { TextHookForm } from '../../components';
import { PageShell } from '../../components/PageShell';
import { appRoutes } from '../../routes';
import { loginUser } from './api';
import { useUserStore } from '../../stores/userStore';

export const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .passthrough();

export default function LoginPage() {
  const nav = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState<string>();
  const setUser = useUserStore((state) => state.setCurrentUser);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const user = await loginUser(values.email, values.password);
      setUser(user);
      nav(`/${appRoutes.hierarchies}`);
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError(JSON.stringify((e as { message: string }).message));
      }
    }
  });

  return (
    <form
      style={{ position: 'relative' }}
      onSubmit={async (e) => {
        onSubmit(e);
      }}
    >
      <PageShell header="Login">
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
      </PageShell>
    </form>
  );
}
