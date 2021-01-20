import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import NaverLogin from 'react-naver-login';
import { Icon, InlineIcon } from '@iconify/react';
import naverIcon from '@iconify-icons/vs/naver';


const useStyles = makeStyles((theme) => ({
  kakaobtn:{
    backgroundColor: '#00c139',
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
    }
  }));

function Naver () {
    const classes = useStyles();
    
    return (
        <NaverLogin 
        clientId="FCgD8QJGI_7PI95LSw2p"
        render={
          (props) => 
            <button className={classes.kakaobtn} onClick={props.onClick}>
              <Icon icon={naverIcon} width="26" height="26" color="#fff" />
            </button>
          }
        onSuccess={(naverUser) => console.log(naverUser)}
        onFailure={() => console.error}
      />
    )

}

export default Naver;