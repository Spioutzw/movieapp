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
            .catch((err) => {throw new Error(err)})
            .finally(() => console.log('done'))
    }
    
    const fetchInfo = async () => {
        const category = infoMovieOrSerie.category === 'TV Series' ? 'tv' : 'movie';
        console.log(infoMovieOrSerie.title);
        await fetch(
            `https://api.themoviedb.org/3/search/${category}?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}&query=${encodeURIComponent(
              infoMovieOrSerie.title)}&year=${infoMovieOrSerie.year}&language=en-US` , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }

          )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results[0]);
                setTMDbINFO(data.results[0]);
            });
    }

    useEffect(() => {
        fetchData()
        if(infoMovieOrSerie.title) {
            fetchInfo()
        }
        console.log(TMDbINFO, 'TMDbINFO');
       
    }, [infoMovieOrSerie.title])

  return (
    <div>
        {infoMovieOrSerie.title && <CardInfo movie={infoMovieOrSerie} info={TMDbINFO}  />}
    </div>
  )
}

export default page