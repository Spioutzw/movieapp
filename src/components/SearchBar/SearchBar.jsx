import Image from 'next/image';
import React from 'react';
import style from './SearchBar.module.css';

const SearchBar = (props) => {
  return (
    <div className={style.searchContainer}>
        <div className={style.searchInput}>
          <Image src="/assets/icon-search.svg" alt="Search Logo" height={24} width={24}  />
          <input className={style.input} type="text" placeholder={props.placeholder} onChange={(event) => props.onSearch(event.target.value)} />
        </div>
    </div>
  );
};

export default SearchBar;
