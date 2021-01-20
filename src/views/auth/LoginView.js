import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userActions } from '../../actions';
import Facebook from "./Facebook";
import Google from "./Google";
import Microsoft from "./Microsoft";
import Kakao from "./Kakao";
import Naver from "./Naver";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  snsLogin: {
    marginTop:20,
    "& button":{
      width:"50px",
      padding: 10,
      borderRadius:'50%'
    }
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const { email, password } = inputs;

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);
  
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  
  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: '/app/dashboard' } };
      dispatch(userActions.login(email, password, from));
    }
  }
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
       
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography>
             
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onChange={handleChange}
              type="text"
              value={email}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              type="password"
              value={password}
              variant="outlined"
            />
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {loggingIn && <CircularProgress />}
                Sign in now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Don&apos;t have an account?
              {' '}
              <Link
                component={RouterLink}
                to="/register"
                variant="h6"
              >
                Sign up
              </Link>
            </Typography>
            <Grid className={classes.snsLogin} container spacing={2} >
              <Grid item >
                <Google /> 
              </Grid>
              <Grid item >
                <Facebook /> 
              </Grid>
              <Grid item >
                <Microsoft />
              </Grid>
              <Grid item >
                <Kakao />
              </Grid>
              <Grid item >
                <Naver />
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;


