import React from 'react';
import SeeMore from '@/components/Page/SeeMore';

const TrendingMovies = () => {

    return (
        <SeeMore
            title={'Trending Movies'}
            url={'https://api.themoviedb.org/3/trending/movie/day'}
            category='movie' />
    )

}



export default TrendingMovies