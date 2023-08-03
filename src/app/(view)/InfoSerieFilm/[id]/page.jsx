'use client'

import CardInfo from '@/components/Card/CardInfo';
import React, { useCallback, useEffect, useState } from 'react'

const InfoSerieOrFilm = ({ params, searchParams }) => {



    const [TMDbINFO, setTMDbINFO] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    console.log(TMDbINFO, 'TMDbINFO')


    const fetchInfo =  useCallback(async () => {
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

                await fetch(`https://api.themoviedb.org/3/${searchParams.category}/${params.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const filterTrailer = data.results.filter((video) => video.type === 'Trailer')
                        setTMDbINFO((prevState) => ({ ...prevState, videos: filterTrailer }))
                    }
                    )
    
                await fetch(`https://api.themoviedb.org/3/${searchParams.category}/${params.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const producteur = data.crew.filter((crew) => crew.job === 'Director')
                        console.log(data, 'data');  setTMDbINFO((prevState) => ({ ...prevState, cast: data.cast, crew: producteur}))
                    }
                    )
                    .catch((error) => {
                        console.error('Error:', error);
                    }
                    );
                    setIsLoading(false);
        }
    , [params.id, searchParams.category]);
    

    useEffect(() => {
        fetchInfo();
    }, [fetchInfo])

    return (
        <div>
            { !isLoading && Object.keys(TMDbINFO).length > 0 && <CardInfo info={TMDbINFO} />}
        </div>
    )
}

export default InfoSerieOrFilm