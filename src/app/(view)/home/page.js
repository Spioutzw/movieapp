'use client'

import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react';
import CardTrending from '@/components/Card/CardTrending';
import style from './page.module.css';
import Card from '@/components/Card/Card';
import { useSession } from 'next-auth/react';
import { useSearchContext } from '@/Providers/searchProvider';
import Link from 'next/link';
import { useContext } from 'react';


const Home = () => {
  const [trendingMedia, setTrendingMedia] = useState([]);

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [popularTvShows, setPopularTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [upcomingTvShows, setUpcomingTvShows] = useState([]);

  const [idMedia, setIdMedia] = useState([]);

  const { searchQuery, setSearchQuery } = useSearchContext();

  const { data: session } = useSession();

  console.log(session, 'session');


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

  // add isBooking to addMedia from idmedia by comparing idmedia.mediaId with allMedia.id on a function 


  const addBookMarked = async () => {
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
  };





  const fetchDataTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    setTrendingMedia(data.results);
  };

  const fetchPopularMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    const popularMovies = data.results.map((item) => ({
      ...item,
      category: 'movie',
    }));
    setPopularMovies(popularMovies);
  };

  const fetchTopRatedMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    const topRatedMovies = data.results.map((item) => ({
      ...item,
      category: 'movie',
    }));
    setTopRatedMovies(topRatedMovies);
  };

  const fetchUpcomingMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    const upcomingMovies = data.results.map((item) => ({
      ...item,
      category: 'movie',
    }));
    setUpcomingMovies(upcomingMovies);
  };


  const fetchPopularSerie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    const popularSeries = data.results.map((item) => ({
      ...item,
      category: 'tv',
    }));
    setPopularTvShows(popularSeries);
  };

  const fetchUpcomingSerie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    const upcomingSeries = data.results.map((item) => ({
      ...item,
      category: 'tv',
    }));
    setUpcomingTvShows(upcomingSeries);
  };

  const fetchTopRatedSerie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    const topRatedSeries = data.results.map((item) => ({
      ...item,
      category: 'tv',
    }));
    setTopRatedTvShows(topRatedSeries);
  };



  useEffect(() => {
    fetchDataTrending();
    fetchPopularMovie();
    fetchBookmarkedMovies();
    fetchPopularSerie();
    fetchTopRatedMovie();
    fetchUpcomingMovie();
    fetchUpcomingSerie();
    fetchTopRatedSerie();
  }, []);



  useEffect(() => {
    if (idMedia.length) {
      console.log(idMedia, 'idMedia');
      console.log('je passe ici');
      addBookMarked();
    }
  }, [idMedia])


  console.log(trendingMedia, 'trendingMedia');



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
