import React from 'react';
import { makeStyles } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Icon } from '@iconify/react';
import facebookIcon from '@iconify-icons/brandico/facebook';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import snsLogin  from './snsLogin';

const useStyles = makeStyles((theme) => ({
    facebookBtn: {
        backgroundColor: '#4c69ba',
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

function Facebook () {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();

    const responseFacebook = response => {
        
        const facebookInfo ={
            email:response.email,
            name:response.name,
            password:'q1w2e3r4'
          }
          snsLogin(dispatch,location,facebookInfo);
    }
    const logout = () => {
        window.FB.logout();
    }
    

    return (
        
        <FacebookLogin
        appId="206908144435692"
        autoLoad={false} 
        fields="name,email,picture"
        
        callback={responseFacebook} 
        render={renderProps => (
            <button className={classes.facebookBtn}
               onClick={renderProps.onClick}>
               <Icon icon={facebookIcon}
               color={"#fff"}
               width="26" height="26" 
               />
               
            </button>
          )}
        />
    
)



}

export default Facebook;