import React from 'react';
import SeeMore from '@/components/Page/Seemore/SeeMore';

const GenreMovies = ({searchParams}) => {

    return (
        <SeeMore
            title={`${searchParams.genreName} Movies`}
            url={`/api/AllFetch?media_type=movie&with_genres=${searchParams.genresid}&category=GenreMedia&`}
            category='movie' 
            genre={true}
            />
    )
}



export default GenreMovies