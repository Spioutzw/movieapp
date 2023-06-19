import Image from 'next/image';
import React from 'react';
import style from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={style.searchContainer}>
        <div className={style.searchInput}>
          <Image src="/assets/icon-search.svg" alt="Search Logo" height={24} width={24}  />
          <input type="text" placeholder="Search for movies or TV series" />
        </div>
    </div>
  );
};

export default SearchBar;
