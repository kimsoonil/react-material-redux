import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const registering = useSelector(state => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
        <Formik 
          initialValues={{
            email: '',
            name: '',
            password: '',
          }}
          validationSchema={
            Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              name: Yup.string().max(255).required('First name is required'),
              password: Yup.string().max(255).required('password is required'),
            })
          }
          onSubmit={(values) => {
            console.log(values)
            dispatch(userActions.register(values));
          }}
          > 
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) =>
          <form name="form" onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Create new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              variant="outlined"
              inputProps={{ maxLength: 20 }}
            />
            <TextField
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              type="test"
              value={values.email}
              variant="outlined"
              inputProps={{ maxLength: 40 }}
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              value={values.password}
              variant="outlined"
              inputProps={{ maxLength: 20 }}
            />
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                disabled={isSubmitting}
                variant="contained"
              >
                {registering && <CircularProgress />}
                Sign up now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Have an account?
              {' '}
              <Link
                component={RouterLink}
                to="/login"
                variant="h6"
              >
                Sign in
              </Link>
            </Typography>
          </form>
          }
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
