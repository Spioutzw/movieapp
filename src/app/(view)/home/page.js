'use client'

import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState, useCallback } from 'react';
import CardTrending from '@/components/Card/CardTrending';
import style from './page.module.css';
import Card from '@/components/Card/Card';
import { useSearchContext } from '@/Providers/searchProvider';
import Link from 'next/link';
import { fetchDataTrending,fetchPopularMovie,fetchPopularSerie,fetchTopRatedMovie,fetchTopRatedSerie,fetchUpcomingMovie,fetchUpcomingSerie } from '@/utils/utils';


const Home = () => {
  
  const [trendingMedia, setTrendingMedia] = useState([]);

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [popularTvShows, setPopularTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [upcomingTvShows, setUpcomingTvShows] = useState([]);

  const [idMedia, setIdMedia] = useState([]);

  const { setSearchQuery } = useSearchContext();


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

  const addBookMarked = useCallback(async () => {
    idMedia.map(async (id) => {
        const category = id.category;
        await fetch(
            `https://api.themoviedb.org/3/${category}/${id.mediaId}?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        setPopularMovies((prevState) =>
            prevState.map((movie) =>
                movie.id === parseInt(id.mediaId)
                    ? { ...movie, isBookmarked: id.isBooked }
                    : movie
            )
        );
        setTrendingMedia((prevState) =>
            prevState.map((media) =>
                media.id === parseInt(id.mediaId)
                    ? { ...media, isBookmarked: id.isBooked }
                    : media
            )
        );
        setPopularTvShows((prevState) =>
            prevState.map((tvShow) =>
                tvShow.id === parseInt(id.mediaId)
                    ? { ...tvShow, isBookmarked: id.isBooked }
                    : tvShow
            )
        );
    });
}, [idMedia]);

  useEffect(() => {
    fetchDataTrending(setTrendingMedia);
    fetchPopularMovie(setPopularMovies);
    fetchBookmarkedMovies(setIdMedia);
    fetchPopularSerie(setPopularTvShows);
    fetchTopRatedMovie(setTopRatedMovies);
    fetchUpcomingMovie(setUpcomingMovies);
    fetchUpcomingSerie(setUpcomingTvShows);
    fetchTopRatedSerie(setTopRatedTvShows);
  }, []);



  useEffect(() => {
    if (idMedia.length) {
      addBookMarked();
    }
  }, [addBookMarked, idMedia])

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.containerMedia}>
        <SearchBar onSearch={setSearchQuery} placeholder={'Search for movies or TV series'} />
        <div>
          <div className={style.containerH3}>
            <h3 className={style.h3}>Trending Movie</h3>
            <Link href={"/series/trending"}><p>See more</p></Link>
          </div>
          <div className={style.containerMovieTrending}>
            {trendingMedia.filter((media) => media.media_type === 'movie').map((movie, id) => (
              <CardTrending key={id} media={movie} />
            ))}
          </div>
          <div className={style.containerH3}>
            <h3 className={style.h3}>Popular Movie</h3>
            <Link href={"/series/popular"} ><p>See more</p></Link>
          </div>
          <div className={style.containerRecommended}>
            {popularMovies.slice(0, 12).map((movie, id) => (
              <Card key={id} media={movie} />
            ))}
          </div>
          <div className={style.containerH3}>
            <h3 className={style.h3}>Top Rated Movie</h3>
            <Link href={"/series/top"}><p>See more</p></Link>
          </div>
          <div className={style.containerRecommended}>
            {topRatedMovies.slice(0, 12).map((movie, id) => (
              <Card key={id} media={movie} />
            ))}
          </div>
          <div className={style.containerH3}>
            <h3 className={style.h3}>Upcoming Movie</h3>
            <Link href={"/series/upcoming"}><p>See more</p></Link>
          </div>

          <div className={style.containerRecommended}>
            {upcomingMovies.slice(0, 12).map((movie, id) => (
              <Card key={id} media={movie} />
            ))}
          </div>
          <div className={style.containerH3}>
            <h3 className={style.h3}>Trending TV Series </h3>
            <Link href={"/series/trending"}><p>See more</p></Link>
          </div>
          <div className={style.containerMovieTrending}>
            {trendingMedia.filter((media) => media.media_type === 'tv').map((tvShow, id) => (
              <CardTrending key={id} media={tvShow} />
            ))}
          </div>
          <div className={style.containerH3}>
            <h3 className={style.h3}>Popular TV Series</h3>
            <Link href={"/series/popular"}><p>See more</p></Link>
          </div>
          <div className={style.containerRecommended}>
            {popularTvShows.slice(0, 12).map((tvShow, id) => (
              <Card key={id} media={tvShow} />
            ))}
          </div>
          <div className={style.containerH3}>
            <h3 className={style.h3}>Top Rated TV Series</h3>
            <Link href={"/series/top"}><p>See more</p></Link>
          </div>
          <div className={style.containerRecommended}>
            {topRatedTvShows.slice(0, 12).map((tvShow, id) => (
              <Card key={id} media={tvShow} />
            ))}
          </div>
          <div className={style.containerH3}>
            <h3 className={style.h3}>Upcoming TV Series</h3>
            <Link href={"/series/upcoming"}><p>See more</p></Link>
          </div>
          <div className={style.containerRecommended}>
            {upcomingTvShows.slice(0, 12).map((tvShow, id) => (
              <Card key={id} media={tvShow} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
