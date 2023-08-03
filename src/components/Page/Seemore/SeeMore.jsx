'use client'

import NavBar from '@/components/NavBar/NavBar';
import SearchBar from '@/components/SearchBar/SearchBar';
import React, { useEffect, useState, useCallback } from 'react';
import style from './SeeMore.module.css';
import Card from '@/components/Card/Card';
import { useSearchContext } from '@/Providers/searchProvider';



// mediaType and typeOfSearch can 

const SeeMore = ({ title, url, category, genre = false }) => {


    const { setSearchQuery } = useSearchContext();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [medias, setMedias] = useState([]);
    const [totalPages, setPages] = useState(1);


    // Fetch data from API and update state
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const separator = url.includes("?") ? "&" : "?";
        const response = await fetch(`${url}${separator}api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}&page=${currentPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'default'

        });
        const data = await response.json();
        const pageResult = data.total_pages;
        const addCategory = data.results.map((result) => ({ ...result, category: category }));
        setMedias(addCategory);
        setPages(pageResult);
        setIsLoading(false);
    }, [category, currentPage, url]);

    // Fetch data from TMDb API
    useEffect(() => {
        console.log('fetching data');
        fetchData();
    }, [currentPage, fetchData]);


    // Fetch data from TMDb API
    useEffect(() => {
        console.log('fetching data');
        fetchData();
        // ...
    }, [currentPage, fetchData]);

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
                        {medias.filter((media) => media.category === category).map((movie, index) => (
                            <Card
                                key={`${movie.id}-${currentPage}`}
                                media={movie}
                                twoLastCard={index >= medias.length - 2}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>
                    <div className={style.containerButtonPagination}>
                        <button onClick={handlePrevPage}>Previous Page</button>
                            <p>{`Page ${currentPage} of ${totalPages}`}</p>
                        <button onClick={handleNextPage}>Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    );

}



export default SeeMore