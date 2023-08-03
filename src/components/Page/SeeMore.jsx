'use client'

import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react';
import style from './SeeMore.module.css';
import Card from '@/components/Card/Card';
import { useSearchContext } from '@/Providers/searchProvider';


// mediaType and typeOfSearch can 

const SeeMore = ({title,url,category}) => {


    const { setSearchQuery } = useSearchContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [medias, setMedias] = useState([]);


    // Fetch data from API and update state
    const fetchData = async () => {

        const response = await fetch(`${url}?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}&page=${currentPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        const addCategory = data.results.map((result) => ({ ...result, category: category }));
        setMedias(addCategory);
    };

    // Fetch data from TMDb API
    useEffect(() => {
        console.log('fetching data');
        fetchData();
        // ...
    }, [currentPage]);

    // Handle page navigation
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    console.log(medias, 'medias');

    return (
        <div className={style.container}>
            <NavBar />
            <div className={style.containerMedia}>
                <SearchBar onSearch={setSearchQuery} placeholder={'Search for movies or TV series'} />
                <div>
                    <h3 className={style.h3}>{title}</h3>
                    <div className={style.containerMovieTrending}>
                        {medias.filter((media) => media.category === category).map((movie, id) => (
                            <Card key={id} media={movie} />
                        ))}
                    </div>
                    <button onClick={handlePrevPage}>Previous Page</button>
                    <button onClick={handleNextPage}>Next Page</button>
                </div>
            </div>
        </div>
    );

}



export default SeeMore