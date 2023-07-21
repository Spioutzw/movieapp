import React, { useState } from 'react'
import style from './Button.module.css';

function Button({text, disabled, error}) {

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Check if there are any errors
    if (Object.keys(error).length > 0) {
      // If there are errors, reset the isLoading state to false
      setIsLoading(false);
    } else {
      // If there are no errors, simulate a successful form submission
      // and reset the isLoading state after a delay
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  

  return (
    <button disabled={disabled || isLoading} type='submit' onClick={handleClick} style={{
      backgroundColor:isLoading ? 'white' : (Object.keys(error).length > 0 ) ? 'grey' : '#FC4747',
      color: isLoading ? '#161D2F' : 'white',
      cursor: (isLoading || Object.keys(error).length > 0) ? 'not-allowed' : 'pointer',
    }}
      className={style.Button}>
      {isLoading ? "Loading ...." : text}
    </button>
  )
}

export default Button