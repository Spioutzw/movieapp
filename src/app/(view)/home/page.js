'use client'

import NavBar from '@/components/NavBar/NavBar'
import SearchBar from '@/components/SearchBar/SearchBar'
import React, { useEffect, useRef, useState } from 'react'
import CardTrending from '@/components/Card/CardTrending'
import style from './page.module.css'
import { useRouter } from 'next/navigation'
import { CarouselProvider, Slider, Slide, } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Card from '@/components/Card/Card'



function page() {


  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { push } = useRouter();
  const userData = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  }


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

  const slideRef = useRef(null);


  return (
    <CarouselProvider
      naturalSlideWidth={50}
      naturalSlideHeight={20}
      totalSlides={4}
    >
      <NavBar />
      <SearchBar />
      <h3 className={style.h3}>Trending</h3>
      <Slider ref={slideRef}  >
        <div className={style.containerMovieTrending} >
          {trendingMovies.map((movie, id) => (
            <Slide key={id} index={id}>
              <CardTrending
                fetch={fetchData}
                key={movie.id}
                film={movie}
                onClick={() => push(`/movie/${movie.id}`)}
              />
            </Slide>
          ))}
        </div>
      </Slider>

      <h3 className={style.h3}>Recommended for you</h3>


      <div className={style.containerRecommended}>
        {movies.map((movie, id) => (
          <Card
            key={movie.id}
            film={movie}
            onClick={() => push(`/movie/${movie.id}`)}
          />

        ))}
      </div>



      <div> Salut {userData?.email}</div>
      <button onClick={handleLogout}>Logout</button>
    </CarouselProvider>
  )
}

export default page