import React from 'react';
import SeeMore from '@/components/Page/Seemore/SeeMore';

const GenreSeries = ({searchParams}) => {
    console.log(searchParams, 'searchParams')
    return (
        <SeeMore
            title={`${searchParams.genreName} Series TV`}
            url={`https://api.themoviedb.org/3/discover/tv?with_genres=${searchParams.genresid}&`}
            category='tv' 
            genre={true}
            />
    )
}



export default GenreSeries