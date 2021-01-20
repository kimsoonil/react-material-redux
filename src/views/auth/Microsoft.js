import React from "react";
import MicrosoftLogin from "react-microsoft-login";
import { makeStyles } from '@material-ui/core';
import { Icon } from '@iconify/react';
import microsoftWindows from '@iconify-icons/logos/microsoft-windows';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import snsLogin  from './snsLogin';

const useStyles = makeStyles((theme) => ({
    MicrosoftBtn: {
        backgroundColor: '#fff',
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

const Microsoft = () => {
  const classes = useStyles();
  const clientId = "dda9dc96-063e-4302-bf47-0d9851941b94";
  const dispatch = useDispatch();
  const location = useLocation();

  const responseMicrosoft = (error,response) => {
    console.log(response);
    const microsoftInfo ={
        email:response.account.userName,
        name:response.account.name,
        password:'q1w2e3r4'
      }
      snsLogin(dispatch,location,microsoftInfo);
  };
 
//   const logoutHandler = () => {
//     msalInstance.logout();
//   };
 
  return  (
    
     <MicrosoftLogin clientId={clientId} authCallback={responseMicrosoft} >
       <button className={classes.MicrosoftBtn} >
       <Icon icon={microsoftWindows} width="26" height="26"/>
       </button>
     </MicrosoftLogin>
  )
  
};

export default Microsoft;