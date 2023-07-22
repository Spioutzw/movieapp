import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import style from './Form.module.css';
import Button from '../Button/Button';
import Link from 'next/link';

function Form({ title, Message, LoginOrRegister, inputs, textbutton, link, errorBack, handleSubmitLoginOrRegister,clearError }) {


  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape(inputs.reduce((acc, input) => {
    acc[input.name] = input.validation;
    return acc;
  }, {}));

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), mode: 'onChange'  });

  const onSubmit = async (data) => {
    handleSubmitLoginOrRegister(data);
  };

  const disabled = Object.keys(errors).length > 0;


  return (
    <div className={style.containerForm}>
      <h3 className={style.h3}>{title}</h3>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <div key={input.name}>
            {input.type === 'password' ? (
              <div className={style.passwordInputWrapper}>
                <input
                  style={{ borderColor: errors[input.name] ? 'red' : 'inherit' }}
                  className={style.input}
                  placeholder={input.placeholder}
                  {...register(input.name)}
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  className={style.showHideButton}
                  onClick={(event) => {
                    event.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    version="1.1"
                    viewBox="0 0 20 20"
                    x="0px"
                    y="0px"
                    aria-hidden="true"
                    focusable="false"
                    className={style.showHideIcon}
                  >
                    {showPassword ? (
                      <g><path d="M11.998 10a2 2 0 11-4 0 2 2 0 014 0z"></path><path fillRule="evenodd" d="M16.175 7.567L18 10l-1.825 2.433a9.992 9.992 0 01-2.855 2.575l-.232.14a6 6 0 01-6.175 0 35.993 35.993 0 00-.233-.14 9.992 9.992 0 01-2.855-2.575L2 10l1.825-2.433A9.992 9.992 0 016.68 4.992l.233-.14a6 6 0 016.175 0l.232.14a9.992 9.992 0 012.855 2.575zm-1.6 3.666a7.99 7.99 0 01-2.28 2.058l-.24.144a4 4 0 01-4.11 0 38.552 38.552 0 00-.239-.144 7.994 7.994 0 01-2.28-2.058L4.5 10l.925-1.233a7.992 7.992 0 012.28-2.058 37.9 37.9 0 00.24-.144 4 4 0 014.11 0l.239.144a7.996 7.996 0 012.28 2.058L15.5 10l-.925 1.233z" clipRule="evenodd"></path></g>) : (

                      <g>
                        <path d="M16.5 18l1.5-1.5-2.876-2.876a9.99 9.99 0 001.051-1.191L18 10l-1.825-2.433a9.992 9.992 0 00-2.855-2.575 35.993 35.993 0 01-.232-.14 6 6 0 00-6.175 0 35.993 35.993 0 01-.35.211L3.5 2 2 3.5 16.5 18zm-2.79-5.79a8 8 0 00.865-.977L15.5 10l-.924-1.233a7.996 7.996 0 00-2.281-2.058 37.22 37.22 0 01-.24-.144 4 4 0 00-4.034-.044l1.53 1.53a2 2 0 012.397 2.397l1.762 1.762z" fillRule="evenodd" clipRule="evenodd"></path><path d="M11.35 15.85l-1.883-1.883a3.996 3.996 0 01-1.522-.532 38.552 38.552 0 00-.239-.144 7.994 7.994 0 01-2.28-2.058L4.5 10l.428-.571L3.5 8 2 10l1.825 2.433a9.992 9.992 0 002.855 2.575c.077.045.155.092.233.14a6 6 0 004.437.702z"></path>
                      </g>)
                    }
                  </svg>
                </button>
              </div>
            ) : (
              <input
                style={{ borderColor: errors[input.name] ? 'red' : 'inherit' }}
                className={style.input}
                placeholder={input.placeholder}
                {...register(input.name)}
                type={input.type === 'password' && showPassword ? 'text' : input.type}
              />
            )}
            <p className={style.error}>{errors[input.name]?.message}</p>
          </div>
        ))}
        <Button submit={handleSubmit} clear={clearError} error={errors} errorServer={errorBack}  text={textbutton} disabled={disabled} />
        {errorBack && <p className={style.error}>{errorBack}</p>}
        <div className={style.containerPSpan}>
          <p className={style.p}>{Message}</p> <Link href={link}><span className={style.span}>&nbsp; {LoginOrRegister}</span></Link>
        </div>
      </form>
    </div>
  );
}

export default Form
