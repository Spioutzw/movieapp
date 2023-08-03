'use client'

import React, { useEffect, useState, } from 'react';
import { useSearchContext } from '@/Providers/searchProvider';
import Card from '@/components/Card/Card';
import NavBar from '@/components/NavBar/NavBar';
import style from './page.module.css';
import SearchBar from '@/components/SearchBar/SearchBar';

const SearchResults = () =>  {
  const { searchQuery } = useSearchContext();
  const [results, setResults] = useState([]);

  const fetchSearchResults = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    const encodedQuery = encodeURIComponent(query);
    await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodedQuery}&api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredResults = data.results.filter(
          (result) => result.media_type === 'movie' || result.media_type === 'tv'
        );

        setResults(filteredResults);
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => console.log('done'));
  };

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  console.log(searchQuery, 'searchQuery');
  console.log(results, 'results');

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.containerMedia}>
        <SearchBar placeholder={'Search for movies'} />
        <div className={style.containerMediaSearch}>
          {results.length > 0 ? results.map((result) => (
            <Card key={result.id} media={result} />
          )) : 
          <div className={style.containerNoResult}>
            <p>no results for you research : {searchQuery}</p>
            <p>Suggest :</p>
            <ul>
              <li>Try different keywords</li>
              <li>Looking for a movie or TV show?</li>
              <li>Try using a movie, TV show title, an actor or director name, or genre.</li>
            </ul>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
