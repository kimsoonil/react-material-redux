import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src={`${process.env.REACT_APP_HOST} static/logo.svg`}
      {...props}
    />
  );
};

export default Logo;
