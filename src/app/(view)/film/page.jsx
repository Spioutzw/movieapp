'use client'
import Card from '@/components/Card/Card';
import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react'
import style from './page.module.css'

function page() {

    const [movies, setMovies] = useState([]);

    const fetchData = async () => {
        await fetch('/api/AllMovies/', {
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

            <h3 className={style.h3}>Movies</h3>

            <div className={style.containerMovie}>
                {movies.map((movie) => (
                    <Card
                        key={movie.id}
                        film={movie}
                        onClick={() => push(`/movie/${movie.id}`)}
                    />
                ))}
            </div>
        </>
    )
}

export default page