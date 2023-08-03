'use client'

import CardInfo from '@/components/Card/CardInfo';
import React, { useCallback, useEffect, useState } from 'react'

const InfoSerieOrFilm = ({ params, searchParams }) => {



    const [TMDbINFO, setTMDbINFO] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    console.log(TMDbINFO, 'TMDbINFO')


    const fetchInfo =  useCallback(async () => {
            setIsLoading(true);
            await fetch(`/api/AllFetch?media_type=${searchParams.media_type}&mediaId=${params.id}&category=Info`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, 'data');
                    setTMDbINFO(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

                await fetch(`/api/AllFetch?media_type=${searchParams.media_type}&mediaId=${params.id}&category=Video`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data, 'data');
                        const filterTrailer = data.results.filter((video) => video.type === 'Trailer')
                        setTMDbINFO((prevState) => ({ ...prevState, videos: filterTrailer }))
                    }
                    )
    
                await fetch(`/api/AllFetch?media_type=${searchParams.media_type}&mediaId=${params.id}&category=Credits`)
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
    , [params.id, searchParams.media_type]);
    

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