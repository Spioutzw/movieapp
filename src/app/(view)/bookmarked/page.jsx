'use client'
import Card from '@/components/Card/Card';
import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState,useCallback } from 'react'
import style from './page.module.css'

const Bookmarked = () => {

    const [medias, setMedias] = useState([]);
    const [idMedia , setIdMedia] = useState([]);
    
    const moviesOnly = medias.filter((movie) => movie.category === "movie");
    const seriesOnly = medias.filter((movie) => movie.category === "tv");

    const handleUpdateMovies = (filmId, newBookmarkStatus) => {
        if (newBookmarkStatus) {
            setMedias((prevState) =>
                prevState.map((movie) =>
                    movie.id === filmId ? { ...movie, isBookmarked: newBookmarkStatus } : movie
                )
            );
        } else {
            setMedias((prevState) => prevState.filter((movie) => movie.id !== filmId));
        }
    }

      
      const fetchBookmarkedMovies = async () => {
        await fetch('/api/AllBookMarked/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => { setIdMedia(data) })
    }

    const fetchDataMovieTmdb = useCallback(async () => {
        idMedia.map(async (id) => {
            const category = id.category;
            const response = await fetch(
                `https://api.themoviedb.org/3/${category}/${id.mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            setMedias((prevState) => [...prevState, { ...data, isBookmarked: id.isBooked, category: id.category }]);
            return data;
        });
    }, [idMedia]);
      

      console.log(idMedia, 'idMedia');
            
        console.log(medias, 'medias');
        
    

    useEffect(() => {
        fetchBookmarkedMovies()
    }, [])

    useEffect(() => {
        if (idMedia.length) {
            fetchDataMovieTmdb()
        }
    }, [fetchDataMovieTmdb, idMedia])

    return (
        <div className={style.container}>
            <NavBar />
            <div className={style.containerMedia}>
                <SearchBar placeholder={"Search for bookmarked shows"} />
                <div>
                    <h3 className={style.h3}>Bookmarked Movies</h3>
                    <div className={style.containerMovie}>
                        {moviesOnly.map((movie) => (
                            <Card
                                key={movie.id}
                                media={movie}
                                onUpdateMovies={handleUpdateMovies}
                                isBookmarkedPage={true}
                            />
                        ))}
                    </div>

                    <h3 className={style.h3}>Bookmarked Series</h3>

                    <div className={style.containerSeries}>
                        {seriesOnly.map((serie) => (
                            <Card
                                key={serie.id}
                                media={serie}
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

export default Bookmarked