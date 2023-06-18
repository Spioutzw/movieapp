import React from 'react'
import style from './Button.module.css';

function Button(props) {
  return (
    <button type='submit'  className={style.Button}>{props.text}</button>
  )
}

export default Button