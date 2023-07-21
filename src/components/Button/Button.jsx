import React, { useState } from 'react'
import style from './Button.module.css';

function Button(props) {

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    if (props.error || props.errorBack) {
      setIsLoading(false);
    }
    setTimeout(() => {
      setIsLoading(false);
    }
      , 2000);
      
  };

  return (
    <button disabled={isLoading} type='submit' onClick={handleClick} style={{
      backgroundColor: isLoading ? 'white' : '#FC4747',
      color: isLoading ? '#161D2F' : 'white',
      cursor: isLoading ? 'not-allowed' : 'pointer',
    }}
      className={style.Button}>
      {isLoading ? "Loading ...." : props.text}
    </button>
  )
}

export default Button