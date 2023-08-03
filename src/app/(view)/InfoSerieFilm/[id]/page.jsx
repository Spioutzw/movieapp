'use client'

import CardInfo from '@/components/Card/CardInfo';
import React, { useEffect, useState } from 'react'

const page = ({ params, searchParams }) => {



    const [TMDbINFO, setTMDbINFO] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    console.log(searchParams, 'searchParams')


    const fetchInfo = async () => {
        setIsLoading(true);
        await fetch(
            `https://api.themoviedb.org/3/${searchParams.category}/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        )
            .then((response) => response.json())
            .then((data) => {
                setTMDbINFO(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            await fetch(`https://api.themoviedb.org/3/${searchParams.category}/${params.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, 'data');  setTMDbINFO((prevState) => ({ ...prevState, cast: data.cast }))
                }
                )
                .catch((error) => {
                    console.error('Error:', error);
                }
                );
                setIsLoading(false);
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    return (
        <div>
            { !isLoading && Object.keys(TMDbINFO).length > 0 && <CardInfo info={TMDbINFO} />}
        </div>
    )
}

export default page