import React from 'react';
import SeeMore from '@/components/Page/Seemore/SeeMore';

const TopRatedSeriesTV = () => {

    return (
        <SeeMore
            title={'Top Rated SeriesTV'}
            url={'https://api.themoviedb.org/3/tv/top_rated'}
            category='tv' />
    )

}



export default TopRatedSeriesTV