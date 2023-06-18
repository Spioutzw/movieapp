'use client'
import React, { useState } from 'react'
import * as yup from "yup";
import Form from '@/components/Form/Form';
import style from './page.module.css';

const inputs = [
    {
        name: 'email',
        placeholder: 'Email',
        type: 'email',
        validation: yup.string().email().required()
    },
    {
        name: 'password',
        placeholder: 'Mot de passe',
        type: 'password',
        validation: yup.string().min(8).required()
    },
    {
        name: 'confirmPassword',
        placeholder: 'Confirmer le mot de passe',
        type: 'password',
        validation: yup.string().min(8).required()
    }
];

function Register() {

    const [errorBack, setErrorBack] = useState(null);

    const handleSubmit = async (data) => {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        if (response.ok) {
          // If the response is successful, redirect the user to the home page
          window.alert('You have been successfully registered');
          setErrorBack(null);
        } else {
          // If there is an error, display an error message
          if (response.headers.get('content-type')?.includes('application/json')) {
            const error = await response.json();
            setErrorBack(error.message);
          } else {
            const error = await response.text();
            console.error(error);
          }
        }
      };
      

    return (
        <Form
            title="Inscription"
            Message="Déjà inscrit ?"
            LoginOrRegister="Connectez-vous"
            textbutton={'Créer un compte'}
            inputs={inputs}
            link={'/login'}
            handleSubmit={handleSubmit}
            errorBack={errorBack}
            handleSubmitLoginOrRegister={handleSubmit}
        />
    )
}

export default Register