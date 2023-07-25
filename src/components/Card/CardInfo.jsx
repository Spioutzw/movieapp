import React from 'react'
import style from './CardInfo.module.css'
import Image from 'next/image';

function CardInfo({ movie, info }) {

  console.log(movie, 'movie')
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.card}>
        <Image className={style.img} style={{objectFit:'cover'}} src={movie.thumbnail.regular.large} fill alt="Image du film" />
    
      <div className={style.container}>
        <h2>{movie.title}</h2>
        {movie.category === 'Movie' ? <p>Year: {info.release_date}</p> : <p>Release of the first episode: {info.first_air_date}</p>}
        <p>Note: {info.popularity}</p>
        <p>Description: {info.overview}</p>
      </div>
    </div>
  )
}

export default CardInfo