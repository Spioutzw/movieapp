'use client'
import Form from '@/components/Form/Form'
import React from 'react'

const inputs = [
  {
    name: 'Email',
    placeholder: 'Email',
    type: 'email',
  },
  {
    name: 'Password',
    placeholder: 'Mot de passe',
    type: 'password',
  },
]

function Login() {
  return (
    <Form
      title="Connexion"
      Message="Pas encore inscrit ?"
      LoginOrRegister="Inscrivez-vous"
      textbutton={'Se connecter'}
      inputs={inputs}
      link={'/register'}
    />
  )
}

export default Login