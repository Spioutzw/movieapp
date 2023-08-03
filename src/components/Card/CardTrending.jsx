import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import style from './CardTrending.module.css'
import Link from 'next/link';
import { urlPicture,getYear } from '@/utils/utils';

const CardTrending = ({ media }) => {

  const [trending, setTrending] = useState(media);

  useEffect(() => {
    setTrending(media)
  }, [media])

  console.log(trending, 'trending')


  const updateBookmarkStatus = async (filmId, newBookmarkStatus,category) => {
    try {
        const method = newBookmarkStatus ? "POST" : "DELETE";
        let url = `/api/AllBookMarked`;
        if (method === "DELETE") {
            url += `?id=${filmId}`;
        }
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: method === "POST" ? JSON.stringify({ filmId: filmId.toString(), category: category  }) : undefined,
        });
        if (!response.ok) {
            throw new Error("Error updating bookmark status in database");
        }
    } catch (error) {
        console.error(error, 'error updateBookmarkStatus');
    }
}

  const handleBookmarkClick = (filmId, newBookmarkStatus,category) => {
    updateBookmarkStatus(filmId, newBookmarkStatus,category)
      .then(() => {
        console.log("Bookmark status updated in database");
        // Update state to re-render component with new bookmark status
        setTrending((prevState) => ({
          ...prevState,
          isBookmarked: newBookmarkStatus,
        }));
      })
      .catch((error) => {
        // Handle error updating bookmark status in database
        console.error(error);
      });
  }

  return (
    <div className={style.movie}>
      <div className={style.containerImage}>
        <Image className={style.image} draggable={false} src={urlPicture.large + trending.backdrop_path} fill alt=" image d'un film " />
        {trending.isBookmarked ? <Image className={style.bookmark} src={'/assets/icon-bookmark-full.svg'} alt='icon' height={32} width={32} onClick={() => handleBookmarkClick(trending.id, !trending.isBookmarked,trending.category)} /> : <Image className={style.bookmark} src={'/assets/icon-bookmark-empty.svg'} alt='icon' height={32} width={32} onClick={() => handleBookmarkClick(trending.id, !trending.isBookmarked,trending.category)} />}
      </div>

      <div className={style.info}>
        <div className={style.containerSpan}>
          <span className={style.year}>{trending.release_date ? getYear(trending.release_date) : getYear(trending.first_air_date)}</span>
          {trending.media_type === 'movie' ? <Image className={style.icon} src={'/assets/icon-category-movie.svg'} alt='icon' height={12} width={12} /> : <Image className={style.icon} src={'/assets/icon-category-tv.svg'} alt='icon' height={12} width={12} />}
          <span className={style.category}>{trending.media_type}</span>
          <div className={style.rating}><span>{trending.vote_average}</span></div>
        </div>
        <Link href={`/InfoSerieFilm/${trending.id}?category=${trending.media_type}`} ><h3 className={style.h3} >{trending.title ? trending.title : trending.name }</h3></Link>
      </div>
    </div>
  )
}

export default CardTrending