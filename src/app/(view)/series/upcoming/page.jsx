import React from 'react';
import SeeMore from '@/components/Page/Seemore/SeeMore';

const UpcomingSeriesTV = () => {

    return (
        <SeeMore
            title={'Upcoming SeriesTV'}
            url={'https://api.themoviedb.org/3/tv/on_the_air'}
            category='tv' />
    )

}



export default UpcomingSeriesTV