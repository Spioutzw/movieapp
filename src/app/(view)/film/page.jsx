'use client'
import Card from '@/components/Card/Card';
import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react'
import style from './page.module.css'

function page() {

    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div>loading...</div>
      } if (status === 'unauthenticated') {
        push('/login')
      }

      const { data: session, status } = useSession()

    const fetchData = async () => {
        await fetch('/api/AllMovies/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => { setMovies(data) })
            .catch((err) => { throw new Error(err)})
            .finally(() => console.log('done'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={style.container}>
            <NavBar />
            <div>
                <SearchBar onSearch={setSearchQuery} placeholder={"Search for movies"} />

                <div>
                    <h3 className={style.h3}>Movies</h3>

                    <div className={style.containerMovie}>
                        {filteredMovies.map((movie) => (
                            <Card
                                fetch={fetchData}
                                key={movie.id}
                                film={movie}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page