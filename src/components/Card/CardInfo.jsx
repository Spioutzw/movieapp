import React, { useState } from 'react'
import style from './CardInfo.module.css'
import Image from 'next/image';
import { urlPicture, getYear } from '@/utils/utils';
import NavBar from '../NavBar/NavBar';
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { renderRating, toBase64, shimmer } from '@/utils/utils';
import ReactPlayer from 'react-player/youtube'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'

const CardInfo = ({ info }) => {

  console.log(info, 'info')

  const [showVideo, setShowVideo] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleStop = () => {
    setShowVideo(false);
  }

  const castToShow = showAll ? info.cast : info.cast.slice(0, 12);

  const imageSrc =
    info.backdrop_path === null && info.poster_path === null
      ? '/assets/No-Image-Placeholder.svg'
      : info.poster_path === null
        ? urlPicture.large + info.backdrop_path
        : urlPicture.large + info.poster_path;

  const filterSerieJob = info.crew.filter((crew) => crew.job === 'Executive Producer')

  return (
    <div className={style.card}>
      <NavBar />
      <div className={style.container}>
        <div
          className={style.containerImg}
          onMouseEnter={() => setShowPlayButton(true)}
          onMouseLeave={() => setShowPlayButton(false)}

        >
          <Image
            className={`${style.img} ${info.backdrop_path === null && info.poster_path === null
              ? style.placeholderImage
              : ''
              }`}
            src={imageSrc}
            unoptimized
            height={530}
            width={350}
            alt="Image du film"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(240, 140)
            )}`}
          />
          {showPlayButton &&
            <div
              onClick={() => setShowVideo(true)}
              className={style.containerPlayButton}
            >
              {/* Replace this with your play button */}
              <BsFillPlayCircleFill style={{ width: '50px', height: '50px' }} >Play</BsFillPlayCircleFill>
            </div>
          }
        </div>

        {showVideo && info.videos[0] && (

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '5',
              height: '100%',
              width: '100%',
              maxHeight: '30rem',
              maxWidth: '50rem',
              margin: '0 2rem'

            }}

          >
            <div className={style.containerStop}>
              <span>Bande d&apos;annonce</span>
              <RxCross2 style={{cursor: 'pointer'}} onClick={handleStop} />
            </div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${info.videos[0].key}`}
              height= '100%'
              width= '100%'
              volume={0.25}
              config={{
              youtube: {
                playerVars: {
                  controls: 1,
                  modestbranding: 1,
                  showinfo: 0,
                },
              },
            }}
            />

          </div>
        )}

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
            {info.runtime &&
              <div>
                <p>Length</p>
                <p>{info.runtime}</p>
              </div>
            }
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
            {info.crew[0] &&
              <div>
                <p>Producteur</p>
                <p>{info.crew[0].name || filterSerieJob}</p>
              </div>
            }
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
            <p className={style.description}>{info.overview}</p>
          </div>
        </div>
      </div>
      <div className={style.gridContainer}>
       
      </div>
    </div>
  )
}

export default CardInfo