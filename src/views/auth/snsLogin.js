import React from "react";
import { userActions } from '../../actions';

function snsLgoin (dispatch,location,response){

  console.log(response)
  const { from } = location.state || { from: { pathname: '/app/dashboard' } };
  dispatch(userActions.login(response.email, response.password, from));
}

export default snsLgoin;