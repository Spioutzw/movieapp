import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import style from './Form.module.css';
import Button from '../Button/Button';
import Link from 'next/link';

function Form({ title, Message, LoginOrRegister, inputs, textbutton, link, errorBack, handleSubmitLoginOrRegister, }) {


  const [borderColor, setBorderColor] = useState('inherit');

  const schema = yup.object().shape(inputs.reduce((acc, input) => {
    acc[input.name] = input.validation;
    return acc;
  }, {}));

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    handleSubmitLoginOrRegister(data);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setBorderColor('red');
    } else {
      setBorderColor('inherit');
    }
  }, [errors]);


  return (
    <div className={style.containerForm}>
      <h3 className={style.h3}>{title}</h3>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        {inputs.map(input => (
          <div key={input.name}>
            <input style={{borderColor : borderColor }} className={style.input} placeholder={input.placeholder} {...register(input.name)} type={input.type} />
            <p className={style.error}>{errors[input.name]?.message}</p>
          </div>
        ))}
        <Button error={{errorBack,errors}} text={textbutton}  />
        {errorBack && <p className={style.error}>{errorBack}</p>}
        <div className={style.containerPSpan}>
          <p className={style.p}>{Message}</p> <Link href={link} ><span className={style.span}> &nbsp; {LoginOrRegister}</span></Link>
        </div>
      </form>
    </div>
  )
}

export default Form
