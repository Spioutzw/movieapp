import React from 'react';
import SeeMore from '@/components/Page/SeeMore';

const PopularMovies = () => {

    return (
        <SeeMore
            title={'Popular Movies'}
            url={'https://api.themoviedb.org/3/movie/popular/'}
            category='movie' />
    )
}



export default PopularMovies