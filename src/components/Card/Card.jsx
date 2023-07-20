import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import style from './Card.module.css'
import { useRouter } from 'next/navigation';

function Card(props) {


  const [movie, setMovies] = useState(props.film);
  const { push } = useRouter();

  useEffect(() => {
    setMovies(props.film)
  }, [props.film])


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
      console.error(error, 'error updateBookmarkStatus');
    }

  }

  function handleBookmarkClick(filmId, newBookmarkStatus) {

    updateBookmarkStatus(filmId, newBookmarkStatus)
      .then(() => {
        console.log("Bookmark status updated in database");
        // Update state to re-render component with new bookmark status
        setMovies((prevState) => ({
          ...prevState,
          isBookmarked: newBookmarkStatus,
        }));
        // utiliser la function props.onUpdateMovies que si la page est bookmarked
        if (props.isBookmarkedPage) {
          props.onUpdateMovies(filmId, newBookmarkStatus);
        }
        props.fetch()
      })
      .catch((error) => {
        // Handle error updating bookmark status in database
        console.error(error, 'error handleBookmarkClick');
      });
  }


  return (
    <div className={style.movie}>
      <div className={style.containerImage}>
        <Image className={style.image} draggable={false} src={movie.thumbnail.regular.small} width={240} height={140} alt=" image d'un film " />
        {movie.isBookmarked ? <Image className={style.bookmark} src={'/assets/icon-bookmark-full.svg'} alt='icon' height={32} width={32} onClick={() => handleBookmarkClick(movie.id, !movie.isBookmarked)} /> : <Image className={style.bookmark} src={'/assets/icon-bookmark-empty.svg'} alt='icon' height={32} width={32} onClick={() => handleBookmarkClick(movie.id, !movie.isBookmarked)} />}
      </div>
      <div className={style.info}>
        <div className={style.containerSpan}>
          <span className={style.year}>{movie.year}</span>
          {movie.category === 'Movie' ? <Image className={style.icon} src={'/assets/icon-category-movie.svg'} alt='icon' height={12} width={12} /> : <Image className={style.icon} src={'/assets/icon-category-tv.svg'} alt='icon' height={12} width={12} />}
          <span>{movie.category}</span>
          <div className={style.rating}><span>{movie.rating}</span></div>
        </div>
        <h3 className={style.h3} onClick={() => push(`/InfoSerieFilm/${movie.id}`)}>{movie.title}</h3>
      </div>
    </div>
  )
}

export default Card