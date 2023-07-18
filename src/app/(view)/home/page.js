'use client'

import NavBar from '@/components/NavBar/NavBar'
import SearchBar from '@/components/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import CardTrending from '@/components/Card/CardTrending'
import style from './page.module.css'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card/Card'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'




function page() {


  const { data: session, status } = useSession()
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { push } = useRouter();


  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrendingMovies = trendingMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchData = async () => {
    await fetch('/api/TrendingMovie/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => { setTrendingMovies(data) })
      .catch((err) => console.log(err))
      .finally(() => console.log('done'))


    await fetch('/api/AllMovieAndSerie/', {
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


  console.log(session, 'session');

  if (status === 'loading') {
    return <div>loading...</div>
  } if (status === 'unauthenticated') {
    push('/login')
  }

  

  return (
    <div className={style.container}>
      <NavBar />
      <div>
        <SearchBar onSearch={setSearchQuery} placeholder={"Search for movies or TV series"} />
        <div>
          <h3 className={style.h3}>Trending</h3>
          <div className={style.containerMovieTrending}>
            {filteredTrendingMovies.map((movie) => (
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