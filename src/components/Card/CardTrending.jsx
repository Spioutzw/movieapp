import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import style from './CardTrending.module.css'

function CardTrending(props) {

    const [trending, setTrending] = useState(props.film);

    
    async function updateBookmarkStatus(filmId, newBookmarkStatus) {
        try {
          const response = await fetch(`/api/AllMovieAndSerie/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            
            body: JSON.stringify({ isBookmarked: newBookmarkStatus, filmId: filmId }),
          });
          if (!response.ok) {
            throw new Error("Error updating bookmark status in database");
          }
        } catch (error) {
            console.error(error);
            }

      }

    function handleBookmarkClick(filmId, newBookmarkStatus) {
        updateBookmarkStatus(filmId, newBookmarkStatus)
          .then(() => {
            console.log("Bookmark status updated in database");
            // Update state to re-render component with new bookmark status
                setTrending((prevState) => ({
                    ...prevState,
                    isBookmarked: newBookmarkStatus,
                    }));
                props.fetch()
          })
          .catch((error) => {
            // Handle error updating bookmark status in database
            console.error(error);
          });
      }

    return (
        <div className={style.movie}>
            <div className={style.containerImage}>
                <Image draggable={false} src={trending.thumbnail.trending.small} width={240} height={140} alt=" image d'un film " />
                {trending.isBookmarked ? <Image className={style.bookmark} src={'/assets/icon-bookmark-full.svg'} alt='icon' height={32} width={32} onClick={() => handleBookmarkClick(trending.id,!trending.isBookmarked)} /> : <Image className={style.bookmark} src={'/assets/icon-bookmark-empty.svg'} alt='icon' height={32} width={32} onClick={() => handleBookmarkClick(trending.id,!trending.isBookmarked)} />}
            </div>
            
            <div className={style.info}>
                <div className={style.containerSpan}>
                    <span>{trending.year}</span>
                    {trending.category === 'Movie' ? <Image src={'/assets/icon-category-movie.svg'} alt='icon' height={12} width={12} /> : <Image src={'/assets/icon-category-tv.svg'} alt='icon' height={12} width={12} />}
                    <span>{trending.category}</span>
                    <div className={style.rating}><span>{trending.rating}</span></div>
                </div>
                <h3>{trending.title}</h3>
            </div>
        </div>
    )
}

export default CardTrending