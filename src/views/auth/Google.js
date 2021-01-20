
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { mdiGooglePlus } from '@mdi/js';
import { makeStyles } from '@material-ui/core';
import Icon from '@mdi/react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import snsLogin  from './snsLogin';

const useStyles = makeStyles((theme) => ({
  googleBtn: {
      backgroundColor: '#dc4e41',
      alignItems: 'center',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
      padding: 15,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: '14px',
      fontWeight: 500,
      fontFamily: 'Roboto, sans-serif',
      textAlign:'center',
      cursor:'pointer'
  },
  
}));

function Google() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const responseGoogle = (response) =>{ 
      const googleInfo ={
        email:response.profileObj.email,
        name:response.profileObj.name,
        password:'q1w2e3r4'
      }
      snsLogin(dispatch,location,googleInfo);
  }
   
  return (
    <div >
        <GoogleLogin
            clientId='767443583526-bbfjh2vk9196rnaakcpgvvjp4vunivjt.apps.googleusercontent.com'
            onSuccess={responseGoogle}
            onFailure={response => console.log(response)}
            render={renderProps => (
              <button className={classes.googleBtn} onClick={renderProps.onClick}>
              <Icon path={mdiGooglePlus}
               title="User Profile"
               size={1}
               color={"#fff"}
               />
              </button>
            )}
        />
    </div>
  );
};

export default Google;