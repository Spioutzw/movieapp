'use client'

import React, { useEffect, useRef } from 'react';
import style from './SearchBar.module.css';
import { useSearchContext } from '@/Providers/searchProvider';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const SearchBar = ({ placeholder }) => {
  
  const { searchQuery, setSearchQuery } = useSearchContext();
  const router = useRouter();
  const url = usePathname();
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    localStorage.setItem("inputValue", newQuery);
    router.push(`/searchResult?query=${encodeURI(newQuery)}`);
    if (newQuery === '') {
      router.push('/home');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    inputRef.current.focus();
    if(url === '/searchResult') {
      setSearchQuery(localStorage.getItem("inputValue"));
    
    } else {
      setSearchQuery('');
    }
    
  }, [setSearchQuery, url]);

  

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

