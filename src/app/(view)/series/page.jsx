'use client'
import Card from '@/components/Card/Card';
import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react'
import style from './page.module.css'

function page() {

    const [series, setSeries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSeries = series.filter((serie) =>
        serie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    const fetchData = async () => {
        await fetch('/api/AllSeries/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => { setSeries(data) })
            .catch((err) => {throw new Error(err)})
            .finally(() => console.log('done'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={style.container}>
            <NavBar />
            <div className={style.containerMedia}>
                <SearchBar onSearch={setSearchQuery} placeholder={"Search for TV series"} />
                <div >

                    <h3 className={style.h3}>Series</h3>

                    <div className={style.containerSeries}>
                        {filteredSeries.map((serie) => (
                            <Card
                                fetch={fetchData}
                                key={serie.id}
                                film={serie}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page