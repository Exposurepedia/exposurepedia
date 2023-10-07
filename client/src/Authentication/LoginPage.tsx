/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import {
  TextField,
  Link,
  Typography,
  Grid,
  CircularProgress,
  ListItem,
  Card,
  List,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { login as loginRedux } from '../util/redux/userSlice';
import { load as loadRedux } from '../util/redux/filterSlice';
import FormGrid from '../components/form/FormGrid';
import FormCol from '../components/form/FormCol';
import FormRow from '../components/form/FormRow';
import { emailRegex, InputErrorMessage } from '../util/inputvalidation';
import { loginUser } from './api';
import AlertDialog from '../components/AlertDialog';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { getData } from '../util/api';
import { useAppDispatch } from '../util/redux/hooks';
import ExpansionCard from '../ExpansionCard';
import Filters from '../Exposurepedia/Filters';
import FilterPanel from '../Exposurepedia/FilterPanel';

const styles = {
  container: {
    height: '90vh',
    display: 'flex',
    'margin-top': '10vh',
    justifyContent: 'center',
    margin: 'center',
  },
  centered: {
    height: '90vh',
    display: 'flex',
    'flex-direction': 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

/**
 * A page allowing users to input their email and password to login. The default
 * starting page of the application
 */
function LoginPage() {
  const navigate = useNavigate();

  // Default values for state
  const defaultValues = {
    email: '',
    password: '',
  };
  const defaultShowErrors = {
    email: false,
    password: false,
    alert: false,
  };
  const defaultErrorMessages = {
    email: '',
    password: '',
    alert: '',
  };
  type ValueType = keyof typeof values;

  // State values and hooks
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [values, setValueState] = useState(defaultValues);
  const [showError, setShowErrorState] = useState(defaultShowErrors);
  const [errorMessage, setErrorMessageState] = useState(defaultErrorMessages);

  // Helper functions for changing only one field in a state object
  const setValue = (field: string, value: string) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };
  const setShowError = (field: string, show: boolean) => {
    setShowErrorState((prevState) => ({
      ...prevState,
      ...{ [field]: show },
    }));
  };
  const setErrorMessage = (field: string, msg: string) => {
    setErrorMessageState((prevState) => ({
      ...prevState,
      ...{ [field]: msg },
    }));
  };

  const alertTitle = 'Error';
  const handleAlertClose = () => {
    setShowError('alert', false);
  };

  const dispatch = useAppDispatch();
  function dispatchUser(
    userEmail: string,
    firstName: string,
    lastName: string,
    admin: boolean,
  ) {
    dispatch(loginRedux({ email: userEmail, firstName, lastName, admin }));
  }

  function dispatchFilters(filters: any) {
    dispatch(loadRedux({ filters }));
  }

  const clearErrorMessages = () => {
    setShowErrorState(defaultShowErrors);
    setErrorMessageState(defaultErrorMessages);
  };

  const validateInputs = () => {
    clearErrorMessages();
    let isValid = true;

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const valueTypeString in values) {
      const valueType = valueTypeString as ValueType;
      if (!values[valueType]) {
        setErrorMessage(valueTypeString, InputErrorMessage.MISSING_INPUT);
        setShowError(valueTypeString, true);
        isValid = false;
      }
    }

    if (!values.email.match(emailRegex)) {
      setErrorMessage('email', InputErrorMessage.INVALID_EMAIL);
      setShowError('email', true);
      isValid = false;
    }
    if (!values.password) {
      setErrorMessage('password', InputErrorMessage.MISSING_INPUT);
      setShowError('password', true);
      isValid = false;
    }

    return isValid;
  };

  async function handleSubmit() {
    if (validateInputs()) {
      setIsLoading(true);

      try {
        const user = await loginUser(values.email, values.password);
        dispatchUser(user.email!, user.firstName!, user.lastName!, user.admin!);
      } catch (e: any) {
        setShowError('alert', true);
        setErrorMessage('alert', e.message);
        setIsLoading(false);
        return;
      }

      setIsLoadingFilters(true);

      try {
        const res = await getData('exposure/filterOptions');
        dispatchFilters(res.data);
        window.location.reload();
        navigate('/home');
      } catch (e: any) {
        setShowError('alert', true);
        setErrorMessage('alert', e.message);
        setIsLoading(false);
        setIsLoadingFilters(false);
      }

      setIsLoading(false);
      setIsLoadingFilters(false);
    }
  }

  return (
    <div>
      {/* THESE ARE JUST RENDERING HERE FOR NOW UNTIL I CAN GET THE REAL PAGE RUNNING */}
      <FilterPanel
      // filterOptions={{ filter1: ['sass'], filter2: 'me' }}
      // setFilterOptions={(o: { filters: any }) => {
      //   console.log('o', o);
      // }}
      // isLoading={false}
      />
      <List sx={{ width: '100%' }}>
        <ListItem sx={{ width: '100%' }}>
          <ExpansionCard
            exposure={{
              name: 'my exposure',
              disorders: [],
              appropriateFor: 'child',
              formats: ['option1', 'option2', 'option3', 'option4'],
              interventionTypes: [],
              keywords: [],
              updatedAt: '',
            }}
            isBookmarked
            isSelected
          />
        </ListItem>
        <ListItem sx={{ width: '100%' }}>
          <ExpansionCard
            exposure={{
              name: 'my exposure',
              disorders: [],
              appropriateFor: 'child',
              formats: ['option1', 'option2'],
              interventionTypes: [],
              keywords: [],
              updatedAt: '',
              link: 'https://www.youtube.com/watch?v=pTSiQCYQuvA&ab_channel=JonaTiba',
            }}
            isBookmarked={false}
            isSelected
          />
        </ListItem>
      </List>

      {isLoading ? (
        <div style={styles.centered}>
          <CircularProgress />
          {isLoadingFilters ? (
            <p>loading exposurepedia database...</p>
          ) : (
            <p>logging in (this may take a few moments)...</p>
          )}
        </div>
      ) : (
        <div style={styles.container}>
          <FormGrid>
            <FormCol>
              <Grid item container justifyContent="center">
                <Typography variant="h2" textAlign="center">
                  Login
                </Typography>
              </Grid>
              <Grid item width="1">
                <TextField
                  fullWidth
                  error={showError.email}
                  helperText={errorMessage.email}
                  type="email"
                  required
                  label="Email"
                  value={values.email}
                  onChange={(e) => setValue('email', e.target.value)}
                />
              </Grid>
              <Grid item width="1">
                <TextField
                  fullWidth
                  error={showError.password}
                  helperText={errorMessage.password}
                  type="password"
                  required
                  label="Password"
                  value={values.password}
                  onChange={(e) => setValue('password', e.target.value)}
                />
              </Grid>
              <Grid item container justifyContent="center">
                <PrimaryButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  onClick={() => handleSubmit()}
                >
                  Login
                </PrimaryButton>
              </Grid>
              <FormRow>
                <Grid item>
                  <Link component={RouterLink} to="/email-reset">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/register">
                    Sign up
                  </Link>
                </Grid>
              </FormRow>
            </FormCol>
          </FormGrid>
          {/* The alert that pops up */}
          <Grid item>
            <AlertDialog
              showAlert={showError.alert}
              title={alertTitle}
              message={errorMessage.alert}
              onClose={handleAlertClose}
            />
          </Grid>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
