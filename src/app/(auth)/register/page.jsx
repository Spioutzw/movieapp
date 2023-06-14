'use client'
import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from '@/components/Form/Form';

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
    }
];

function Register() {
    return (
        <div>
            <Form 
                title="Inscription"
                Message="Déjà inscrit ?"
                LoginOrRegister="Connectez-vous"
                inputs={inputs}
            />
        </div>
    )
}

export default Register