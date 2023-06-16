'use client'
import React from 'react'
import * as yup from "yup";
import Form from '@/components/Form/Form';
import style from './page.module.css';

const inputs = [
    {
        name: 'Email',
        placeholder: 'Email',
        type: 'email',
        validation: yup.string().email().required()
    },
    {
        name: 'Password',
        placeholder: 'Mot de passe',
        type: 'password',
        validation: yup.string().min(8).required()
    },
    {
        name: 'ConfirmPassword',
        placeholder: 'Confirmer le mot de passe',
        type: 'password',
        validation: yup.string().min(8).required()
    }
];

function Register() {
    return (
            <Form 
                title="Inscription"
                Message="Déjà inscrit ?"
                LoginOrRegister="Connectez-vous"
                textbutton={'Créer un compte'}
                inputs={inputs}
                link={'/login'}
            />
    )
}

export default Register