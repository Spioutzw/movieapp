'use client'

import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState, useCallback } from 'react';
import CardTrending from '@/components/Card/CardTrending';
import style from './page.module.css';
import Card from '@/components/Card/Card';
import { useSearchContext } from '@/Providers/searchProvider';
import Link from 'next/link';
import { fetchDataTrending,fetchPopularMovie,fetchPopularSerie,fetchTopRatedMovie,fetchTopRatedSerie,fetchUpcomingMovie,fetchUpcomingSerie, addBookMarked } from '@/utils/utils';



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

  


  useEffect(() => {
    fetchDataTrending(setTrendingMedia);
    fetchPopularMovie(setPopularMovies);
    fetchPopularSerie(setPopularTvShows);
    fetchTopRatedMovie(setTopRatedMovies);
    fetchUpcomingMovie(setUpcomingMovies);
    fetchUpcomingSerie(setUpcomingTvShows);
    fetchTopRatedSerie(setTopRatedTvShows);
    fetchBookmarkedMovies(); 

  }, []);
   
  useEffect(() => {
    if (idMedia.length) {
      addBookMarked(
        idMedia,
        setPopularMovies,
        setTrendingMedia,
        setPopularTvShows,
        setUpcomingTvShows,
        setTopRatedTvShows,
        setUpcomingMovies,
        setTopRatedMovies
      );
    }
  }, [idMedia]);

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
            { trendingMedia.filter((media) => media.media_type === 'movie').map((movie, id) => (
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
