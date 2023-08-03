import React from 'react';
import SeeMore from '@/components/Page/SeeMore';

const TopRatedMovies = () => {

    return (
        <SeeMore
            title={'Top Rated Movies'}
            url={'https://api.themoviedb.org/3/movie/top_rated'}
            category='movie' />
    )

}



export default TopRatedMovies