import Image from 'next/image'
import React from 'react'
import style from './NavBar.module.css'

function NavBar() {
    return (
        <nav className={style.navigation}>
            <div className={style.logo}>
                <Image src="/assets/logo.svg" alt="Logo" width={24} height={24} />
            </div>
            <div className={style.menu}>
                <button><Image src="/assets/icon-nav-home.svg" alt="Menu 1" width={16} height={16} /></button>
                <button><Image src="/assets/icon-nav-movies.svg" alt="Menu 2" width={16} height={16} /></button>
                <button><Image src="/assets/icon-nav-tv-series.svg" alt="Menu 3" width={16} height={16} /></button>
                <button><Image src="/assets/icon-nav-bookmark.svg" alt="Menu 4" width={16} height={16} /></button>
            </div>
            <div className={style.profilePic}>
                <Image src="/assets/icon-play.svg" alt="Profile Picture" width={24} height={24}/>
            </div>
        </nav>
    )
}

export default NavBar