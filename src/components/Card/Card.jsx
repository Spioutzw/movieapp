import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import style from './Card.module.css'
import Link from 'next/link';
import { urlPicture, getYear } from '@/utils/utils';


const Card = ({ media, onUpdateMovies, isBookmarkedPage }) => {


  const [mediaCard, setMediaCard] = useState(media);


  useEffect(() => {
    setMediaCard(media)
  }, [media])


   console.log(mediaCard, 'mediaCard')



  const updateBookmarkStatus = async (filmId, newBookmarkStatus, category) => {
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
        body: method === "POST" ? JSON.stringify({ filmId: filmId.toString(), category: category }) : undefined,
      });
      if (!response.ok) {
        throw new Error("Error updating bookmark status in database");
      }
    } catch (error) {
      console.error(error, 'error updateBookmarkStatus');
    }
  }

  const handleBookmarkClick = (filmId, newBookmarkStatus, category) => {

    updateBookmarkStatus(filmId, newBookmarkStatus, category)
      .then(() => {
        console.log("Bookmark status updated in database");
        // Update state to re-render component with new bookmark status
        setMediaCard((prevState) => ({
          ...prevState,
          isBookmarked: newBookmarkStatus,
        }));
        // utiliser la function props.onUpdateMovies que si la page est bookmarked
        if (isBookmarkedPage) {
          onUpdateMovies(filmId, newBookmarkStatus);
        }
      })
      .catch((error) => {
        // Handle error updating bookmark status in database
        console.error(error, 'error handleBookmarkClick');
      });
  }


  return (
    <div className={style.movie}>
      <div className={style.containerImage}>
        <Image className={`${style.image} ${mediaCard.backdrop_path === null && mediaCard.poster_path === null
            ? style.placeholderImage
            : ""
          }`} draggable={false} src={
            mediaCard.backdrop_path === null && mediaCard.poster_path === null
              ? '/assets/No-Image-Placeholder.svg'
              : mediaCard.backdrop_path === null
                ? urlPicture.large + mediaCard.poster_path
                : urlPicture.large + mediaCard.backdrop_path} width={240} height={140} alt=" image d'un film " />
        {mediaCard.isBookmarked ? <Image className={style.bookmark} src={'/assets/icon-bookmark-full.svg'} alt='icon' height={32} width={32} onClick={() => handleBookmarkClick(mediaCard.id, !mediaCard.isBookmarked, mediaCard.category)} /> : <Image className={style.bookmark} src={'/assets/icon-bookmark-empty.svg'} alt='icon' height={32} width={32} onClick={() => handleBookmarkClick(mediaCard.id, !mediaCard.isBookmarked, mediaCard.category)} />}
      </div>
      <div className={style.info}>
        <div className={style.containerSpan}>
          <span className={style.year}>{mediaCard.release_date  ? getYear(mediaCard.release_date) : getYear(mediaCard.first_air_date)}</span>
          {mediaCard.category === 'mediaCard' ? <Image className={style.icon} src={'/assets/icon-category-mediaCard.svg'} alt='icon' height={12} width={12} /> : <Image className={style.icon} src={'/assets/icon-category-tv.svg'} alt='icon' height={12} width={12} />}
          <span className={style.category}>{mediaCard.category}</span>
          <div className={style.rating}><span>{mediaCard.vote_average}</span></div>
        </div>
        <Link href={`/InfoSerieFilm/${mediaCard.id}?category=${mediaCard.category ? mediaCard.category  : mediaCard.media_type }`} ><h3 className={style.h3} >{mediaCard.title ? mediaCard.title : mediaCard.name}</h3></Link>
      </div>
    </div>
  )
}

export default Card