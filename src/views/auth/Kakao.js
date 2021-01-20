import React from 'react';
import { makeStyles } from '@material-ui/core';
import KakaoLogin from 'react-kakao-login';
import { Icon } from '@iconify/react';
import kakaotalkIcon from '@iconify-icons/vs/kakaotalk';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import snsLogin  from './snsLogin';

const useStyles = makeStyles((theme) => ({
  kakaobtn:{
    backgroundColor: '#ffe90e',
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

  
function Kakao () {
    const classes = useStyles();
    const dispatch = useDispatch();
  const location = useLocation();
    const token = "92ebc29312b1a648d031cc63ac0ac8af";

    const responseKakao = (response) =>{ 
      console.log(response.profile);
      const kakaoInfo ={
        email:response.profile.kakao_account.email,
        name:response.profile.properties.nickname,
        password:'q1w2e3r4'
      }
      snsLogin(dispatch,location,kakaoInfo);
  }

  
    return (
       <KakaoLogin
            token={token}
            onSuccess={responseKakao}
            onFail={console.error}
            onLogout={console.info}
            useLoginForm
            render={({ onClick }) => {
              return (
                <button className={classes.kakaobtn} onClick={(e) => {
                  e.preventDefault();
                  onClick();
                }}>
                  <Icon icon={kakaotalkIcon} width="26" height="26" />
                </button>
              );
            }}
        />
)



}

export default Kakao;