import React, { useEffect, useState } from 'react';
import style from './Button.module.css';

const Button =({ text, error ,isLoading }) => {
  

  return (
    <button
      disabled={ Object.keys(error).length > 0 || isLoading}
      type='submit'
      style={{
        backgroundColor: isLoading ? 'white' : Object.keys(error).length > 0 ? 'grey' : '#FC4747',
        color: isLoading ? '#161D2F' : 'white',
        cursor: isLoading || Object.keys(error).length > 0 ? 'not-allowed' : 'pointer'
      }}
      className={style.Button}
    >
      
      {isLoading ? 'Loading ....' : text}
    </button>
  );
}

export default Button;
