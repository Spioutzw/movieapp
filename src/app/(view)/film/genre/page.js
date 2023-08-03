import React from 'react';
import SeeMore from '@/components/Page/Seemore/SeeMore';

const GenreMovies = ({searchParams}) => {

    return (
        <SeeMore
            title={`${searchParams.genreName} Movies`}
            url={`https://api.themoviedb.org/3/discover/movie?with_genres=${searchParams.genresid}&`}
            category='movie' 
            genre={true}
            />
    )
}



export default GenreMovies