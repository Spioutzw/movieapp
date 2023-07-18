'use client'
import Form from '@/components/Form/Form'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {getSession, signIn} from 'next-auth/react'


const inputs = [
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    placeholder: 'Mot de passe',
    type: 'password',
  },

]

function Login() {

  const [errorBack, setErrorBack] = useState(null);
  const { push } = useRouter();

 

  const handleSubmit = async (data) => {

    console.log(data)

    const {email , password} = data
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  
    if (response.error) {
      // If there is an error, display an error message
      setErrorBack(response.error);
    } else {
      // If the response is successful, redirect the user to the home page
      const session = await getSession();
      if (session) {
        push('/home');
      }
      setErrorBack(null);
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
      />
  )
}

export default Login