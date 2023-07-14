import Image from 'next/image'
import React from 'react'
import style from './Card.module.css'

function Card(props) {

    console.log(props.film,'props');
    return (
        <div className={style.movie}>
            <div>
                <Image className={style.image} draggable={false} src={props.film.thumbnail.regular.small} width={240} height={140} alt=" image d'un film " />
            </div>
            <div className={style.info}>
                <div className={style.containerSpan}>
                    <span className={style.year}>{props.film.year}</span>
                    {props.film.category === 'Movie' ? <Image className={style.icon} src={'/assets/icon-category-movie.svg'} alt='icon' height={12} width={12} /> : <Image className={style.icon} src={'/assets/icon-category-tv.svg'} alt='icon' height={12} width={12} />}
                    <span>{props.film.category}</span>
                    <div className={style.rating}><span>{props.film.rating}</span></div>
                </div>
                <h3>{props.film.title}</h3>
            </div>
        </div>
    )
}

export default Card