'use client'
import Form from '@/components/Form/Form'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';


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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      push('/home');
    }
  }, [])


  const handleSubmit = async (data) => {

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });


    if (response.ok) {
      // If the response is successful, redirect the user to the home page
      const userdata = await response.json();
      localStorage.setItem('user', JSON.stringify(userdata));
      window.alert('You have been successfully login');
      push('/home');
      setErrorBack(null);
    } else {
      // If there is an error, display an error message
      console.log('toto');
      const error = await response.json();
      setErrorBack(error.message);
    }
    console.log(errorBack);
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