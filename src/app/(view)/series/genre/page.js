import React from 'react';
import SeeMore from '@/components/Page/Seemore/SeeMore';

const GenreSeries = ({searchParams}) => {
    console.log(searchParams, 'searchParams')
    return (
        <SeeMore
            title={`${searchParams.genreName} Series TV`}
            url={`/api/AllFetch?media_type=tv&with_genres=${searchParams.genresid}&category=GenreMedia&`}
            category='tv' 
            genre={true}
            />
    )
}



export default GenreSeries