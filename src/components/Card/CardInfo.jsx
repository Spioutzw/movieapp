import React from 'react'

function CardInfo({movie}) {

    console.log(movie)
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Année: {movie.year}</p>
      <p>Catégorie: {movie.category}</p>
      <p>Note: {movie.rating}</p>
      <img src={movie.thumbnail.regular.large} alt="Image du film" />
    </div>
  )
}

export default CardInfo