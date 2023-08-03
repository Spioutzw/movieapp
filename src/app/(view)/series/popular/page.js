import React from 'react';
import SeeMore from '@/components/Page/Seemore/SeeMore';

const PopularSeriesTV = () => {

    return (
        <SeeMore
            title={'Popular SeriesTV'}
            url={'https://api.themoviedb.org/3/tv/popular/'}
            category='tv' />
    )
}



export default PopularSeriesTV