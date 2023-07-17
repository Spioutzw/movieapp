'use client'

import CardInfo from '@/components/Card/CardInfo';
import React, { useEffect, useState } from 'react'

function page({params}) {

    const [infoMovieOrSerie, setinfoMovieOrSerie] = useState({});
    const [TMDbINFO, setTMDbINFO] = useState({});

    const fetchData = async () => {
        await fetch(`/api/SerieOrFilmByID/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: params.id }),
        })

            .then((res) => res.json())
            .then((data) => setinfoMovieOrSerie(data))
            .catch((err) => console.log(err))
            .finally(() => console.log('done'))
    }
    
    const fetchInfo = async () => {
        await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}&query=${encodeURIComponent(
              infoMovieOrSerie.title
            )}` , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }

          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data,'data');
                setTMDbINFO(data);
            });
    }

    useEffect(() => {
        fetchData()
        fetchInfo()
    }, [])

    console.log(infoMovieOrSerie)
    console.log(TMDbINFO,'TMDbINFO')
    console.log(process.env.API_KEY_TMDB,'process.env.API_KEY_TMDB')
    
  return (
    <div>
        {infoMovieOrSerie.title && <CardInfo movie={infoMovieOrSerie} />}
    </div>
  )
}

export default page