'use client'

import NavBar from '@/components/NavBar/NavBar'
import SearchBar from '@/components/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import CardTrending from '@/components/Card/CardTrending'
import style from './page.module.css'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card/Card'
import { useSession } from 'next-auth/react'




function page() {

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchData = async () => {

    await fetch('/api/AllMovieAndSerie/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })
      .then((res) => res.json())
      .then((data) => { setMovies(data) })
      .catch((err) => { throw new Error(err) })
      .finally(() => console.log('done'))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={style.container}>
      <NavBar />
      <div>
        <SearchBar onSearch={setSearchQuery} placeholder={"Search for movies or TV series"} />
        <div>
          <h3 className={style.h3}>Trending</h3>
          <div className={style.containerMovieTrending}>
            {filteredMovies.filter(movie => movie.isTrending === true).map((movie) => (
              <CardTrending fetch={fetchData} key={movie.id} film={movie} />
            ))}
          </div>
          <h3 className={style.h3}>Recommended for you</h3>
          <div className={style.containerRecommended}>
            {filteredMovies.map((movie, id) => (
              <Card fetch={fetchData} key={movie.id} film={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default page