'use client'

import React, { useEffect, useRef } from 'react';
import style from './SearchBar.module.css';
import { useSearchContext } from '@/Providers/searchProvider';
import { useRouter,useSearchParams } from 'next/navigation';
import Image from 'next/image';

const SearchBar = ({ placeholder }) => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const router = useRouter();
  const inputRef = useRef(null);
  const params = useSearchParams();

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    router.push(`/searchResult?query=${encodeURI(newQuery)}`);
    if (newQuery === '') {
      router.push('/home');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the search submission if needed, or it will update the URL automatically
  };

  useEffect(() => {
    inputRef.current.focus();
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
    }
    
  }, [searchQuery]);

  return (
    <form onSubmit={handleSubmit} className={style.searchContainer}>
      <div className={style.searchInput}>
      <Image src="/assets/icon-search.svg" alt="Search Logo" height={24} width={24} />
        <input
          ref={inputRef}
          className={style.input}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;

