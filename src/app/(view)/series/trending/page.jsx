import React from 'react';
import SeeMore from '@/components/Page/Seemore/SeeMore';

const TrendingSeriesTV = () => {

    return (
        <SeeMore
            title={'Trending SeriesTV'}
            url={'https://api.themoviedb.org/3/trending/tv/day'}
            category='tv' />
    )

}



export default TrendingSeriesTV