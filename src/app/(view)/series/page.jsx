'use client'
import Card from '@/components/Card/Card';
import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react'
import style from './page.module.css'

function page() {

    const [series, setSeries] = useState([]);

    const fetchData = async () => {
        await fetch('/api/AllSeries/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => { setSeries(data) })
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

            <h3 className={style.h3}>Series</h3>

            <div className={style.containerSeries}>
                {series.map((serie) => (
                    <Card
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