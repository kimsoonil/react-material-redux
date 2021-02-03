import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/public/static/logo.svg"
      {...props}
    />
  );
};

export default Logo;
