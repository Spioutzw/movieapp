'use client'
import Card from '@/components/Card/Card';
import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react'
import style from './page.module.css'
import { useSession } from 'next-auth/react';

function page() {

    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const moviesOnly = filteredMovies.filter((movie) => movie.category === "Movie");
   
   
    const seriesOnly = filteredMovies.filter((movie) => movie.category === "TV Series");

    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div>loading...</div>
      } if (status === 'unauthenticated') {
        push('/login')
      }

     


    function handleUpdateMovies(filmId, newBookmarkStatus) {
  
        setMovies((prevState) =>
          prevState.map((movie) =>
            movie.id === filmId ? { ...movie, isBookmarked: newBookmarkStatus } : movie
          )
        );
      
      }

    const fetchData = async () => {
        await fetch('/api/AllBookMarked/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
        
            },
            cache: 'no-store',
        })
            .then((res) => res.json())
            .then((data) =>  setMovies(data))
            .catch((err) => {throw new Error(err)})
            .finally(() => console.log('done'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={style.container}>
            <NavBar />
            <div>
                <SearchBar onSearch={setSearchQuery} placeholder={"Search for bookmarked shows"} />
                <div >
                    <h3 className={style.h3}>Bookmarked Movies</h3>
                    <div className={style.containerMovie}>
                        {moviesOnly.map((movie) => (
                            <Card
                                fetch={fetchData}
                                key={movie.id}
                                film={movie}
                                onUpdateMovies={handleUpdateMovies}
                                isBookmarkedPage={true}
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
                                onUpdateMovies={handleUpdateMovies}
                                isBookmarkedPage={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page