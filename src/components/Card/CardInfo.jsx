import React, { useEffect } from 'react'
import style from './CardInfo.module.css'
import Image from 'next/image';
import { urlPicture, getYear } from '@/utils/utils';
import NavBar from '../NavBar/NavBar';
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { renderRating } from '@/utils/utils';

const CardInfo = ({ info }) => {

  console.log(info, 'info')

  return (
    <div className={style.card}>
      <NavBar />
      <div className={style.container}>
        <div className={style.containerImg}>
          <Image className={`${style.img} ${info.backdrop_path === null && info.poster_path === null
            ? style.placeholderImage
            : ""
            }`} src={info.backdrop_path === null && info.poster_path === null ? '/assets/No-Image-Placeholder.svg' : info.poster_path === null ? urlPicture.large + info.backdrop_path : urlPicture.large + info.poster_path} unoptimized  height={530} width={350} alt="Image du film" />
        </div>

        <div className={style.containerInfo}>
          <div>
            <h2 className={style.h2}>{info.title ? info.title : info.name}</h2>
          </div>
          <div className={style.containerRating}>
            <p>{renderRating(info.vote_average)}</p> {
              <Rating
                initialRating={renderRating(info.vote_average)}
                className={style.ratingStar}
                emptySymbol={<FaRegStar />}
                fullSymbol={<FaStar />}
                readonly
              />}
          </div>
          <div className={style.infoMedia}>
            <div>
              <p>Length</p>
              <p>{info.runtime}</p>
            </div>
            <div>
              <p>Language</p>
              <p>{info.spoken_languages[0].name}</p>
            </div>
            <div>
              <p>Year</p>
              {info.release_date ? <p>Year: {getYear(info.release_date)}</p> : <p>Release of the first episode: {getYear(info.first_air_date)}</p>}
            </div>
            <div>
              <p>Status</p>
              <p>{info.status}</p>
            </div>
          </div>
          <div>
            <h3 className={style.h3}>Genres</h3>
            <div className={style.containerGenre}>
              {info.genres.map((genre, index) => {
                return <p key={index}>{genre.name}</p>
              })
              }
            </div>
          </div>

          <div>
            <h3 className={style.h3}>Synopsis</h3>
            <p>Description: {info.overview}</p>
          </div>
        </div>
      </div>
      <div className={style.gridContainer}>
        <h3 style={{ textAlign: 'center', color: 'white'}} className={style.h3}>Casts</h3>
        <div className={style.containerCast}>
          {info.cast.filter((cast) => cast.profile_path != null).map((cast) => {
            return (
              <div className={style.containerImgInfo} key={cast.id}>
                <div className={style.containerImgCast}>
                  <Image className={style.imgCast}  src={urlPicture.large + cast.profile_path} fill alt='Picture Cast' />
                </div>
                <div className={style.containerInfoCast}>
                  <p >{cast.name}</p>
                  <p >{cast.character}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CardInfo