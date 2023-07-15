'use client'
import Card from '@/components/Card/Card';
import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react'
import style from './page.module.css'

function page() {

    const [movies, setMovies] = useState([]);
    const moviesOnly = movies.filter((movie) => movie.category === "Movie");
    const seriesOnly = movies.filter((movie) => movie.category === "Series");

    const fetchData = async () => {
        await fetch('/api/AllBookMarked/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => { setMovies(data) })
            .catch((err) => console.log(err))
            .finally(() => console.log('done'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <NavBar />
            <SearchBar />

            <h3 className={style.h3}>Bookmarked Movies</h3>

            <div className={style.containerMovie}>
                {moviesOnly.map((movie) => (
                    <Card
                        fetch={fetchData}
                        key={movie.id}
                        film={movie}
                        onClick={() => push(`/movie/${movie.id}`)}
                    />
                ))}
            </div>

            <h3 className={style.h3}>Bookmarked Series</h3>

            <div className={style.containerSeries}>
                {seriesOnly.map((serie) => (
                    <Card
                        fetch={fetchData}
                        key={serie.id}
                        film={serie}
                        onClick={() => push(`/movie/${movie.id}`)}
                    />
                ))}
            </div>
        </>
    )
}

export default page