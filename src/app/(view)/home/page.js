'use client'

import NavBar from '@/components/NavBar/NavBar'
import SearchBar from '@/components/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import CardTrending from '@/components/Card/CardTrending'
import style from './page.module.css'
import Card from '@/components/Card/Card'
import { useSession } from 'next-auth/react';





function page() {

  const [trendingMedia, setTrendingMedia] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: session } = useSession();



  const filteredTrendingMedia = trendingMedia.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMoviesPopular = popularMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const fetchDataTrending = async () => {
    await fetch(`https://api.themoviedb.org/3/trending/all/week?${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },   
    }).then((res) => res.json())
    .then((data) => { setTrendingMedia(data) })
    .catch((err) => { throw new Error(err) })
    .finally(() => console.log('done')) ;
  }

  const fetchPopularTrending = async () => {
    await fetch(`https://api.themoviedb.org/3/movie/popular?${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    .then((data) => { setPopularMovies(data) })
    .catch((err) => { throw new Error(err) })
    .finally(() => console.log('done')) ;
  }
  
  useEffect(() => {
    fetchDataTrending()
    fetchPopularTrending()
  }, [])

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.containerMedia}>
        <SearchBar onSearch={setSearchQuery} placeholder={"Search for movies or TV series"} />
        <div>
          <h3 className={style.h3}>Trending Movie</h3>
          <div className={style.containerMovieTrending}>
            {filteredTrendingMedia.filter(movie => movie.media_type === "movie").map((movie) => (
              <CardTrending fetch={fetchData} key={movie.id} film={movie} />
            ))}
          </div>
          <h3 className={style.h3}>Popular Movie</h3>
          <div className={style.containerRecommended}>
            {filteredMoviesPopular.map((movie) => (
              <Card fetch={fetchData} key={movie.id} film={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default page