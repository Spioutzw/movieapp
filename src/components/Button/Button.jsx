import React, { useEffect, useState } from 'react'
import style from './Button.module.css';

function Button({text, disabled, error, clear, errorServer, submit}) {

  const [isLoading, setIsLoading] = useState(false);

  console.log(text, disabled, error, clear, errorServer,submit)

  const  handleClick = async () => {
    setIsLoading(true);
    // Check if there are any errors
    if (Object.keys(error).length > 0) {
      // If there are errors, reset the isLoading state to false
      setIsLoading(false);
    } else {
      await submit();
      setIsLoading(false);
    }
  };


  useEffect(() => {
    // Check if errorServer is defined
    if (errorServer) {
      setIsLoading(false);
      // Clear the server errors after a delay of 3 seconds
      const timeoutId = setTimeout(() => {
        clear();
      }, 3000);
      // Cleanup function to clear the timeout
      return () => clearTimeout(timeoutId);
    }
  }, [errorServer, clear]);
  
  
  

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