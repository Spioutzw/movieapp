'use client'
import Form from '@/components/Form/Form'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {getSession, signIn} from 'next-auth/react'
import * as yup from "yup";
import { set } from 'react-hook-form';


const inputs = [
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
    validation : yup.string().email().required()

  },
  {
    name: 'password',
    placeholder: 'Mot de passe',
    type: 'password',
    validation : yup.string().required()
  },

]

const Login = () => {

  const [errorBack, setErrorBack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

 

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setErrorBack(null);
    const {email , password} = data;
    console.log('Calling signIn');
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });


    console.log('signIn response:', response);
  
    if (response.error) {
      // If there is an error, display an error message
      setErrorBack(response.error);
      setIsLoading(false);
    } else {
      // If the response is successful, redirect the user to the home page
      const session = await getSession();
      if (session) {
        push('/home');
      }
    }

    
    
  }


  return (
      <Form
        title="Connexion"
        Message="Pas encore inscrit ?"
        LoginOrRegister="Inscrivez-vous"
        textbutton={'Se connecter'}
        inputs={inputs}
        link={'/register'}
        errorBack={errorBack}
        handleSubmitLoginOrRegister={handleSubmit}
        isLoading={isLoading}

      />
  )
}

export default Login