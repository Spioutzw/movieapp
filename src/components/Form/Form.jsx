import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function Form({ title, Message, LoginOrRegister, inputs }) {
    const schema = yup.object().shape(inputs.reduce((acc, input) => {
        acc[input.name] = input.validation;
        return acc;
    }, {}));

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const onSubmit = data => console.log(data);

    return (
        <div>
            <h3>{title}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {inputs.map(input => (
                    <div key={input.name}>
                        <input placeholder={input.placeholder} {...register(input.name)} type={input.type} />
                        <hr/>
                        <p>{errors[input.name]?.message}</p>
                    </div>
                ))}
                <input type="submit" />
                <p>{Message}</p> <span>{LoginOrRegister}</span>
            </form>
        </div>
    )
}

export default Form
