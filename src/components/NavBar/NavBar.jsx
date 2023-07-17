'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import style from './NavBar.module.css'
import Link from 'next/link'

function NavBar() {

    const userData = JSON.parse(localStorage.getItem('user'));
    const [avatar, setAvatar] = useState(userData?.avatar || '/assets/user.png')
    const fileInputRef = useRef(null)

    const handleAvatarClick = () => {
        // Trigger a click event on the hidden file input element
        fileInputRef.current.click()
    }

    const handleFileChange = async (event) => {
        // Get the selected file from the file input element
        const file = event.target.files[0]
        console.log(URL.createObjectURL(file));
        if (file) {
          // Create a FormData object to hold the selected file
          const formData = new FormData()
          formData.append('file', file)
          // Upload the selected file to your server
          console.log(formData.get('file'),'formData');
          const res = await fetch('/api/UploadAvatar', {
            method: 'POST',
            body: formData
          })
          // Get the URL of the uploaded file from the response
          const newAvatar = await res.json()
          setAvatar(newAvatar.url)

          console.log(newAvatar,'newAvatar');
          // Update the avatar state with the new image URL
          
          // Call the /api/updateAvatar API route to update the user's avatar in the database
          await fetch('/api/UpdateAvatar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userData.email,
                avatar: newAvatar.url
            })
          }).then(res => res.json())
            .then(data => {
                console.log(data,'data');
            })
            .catch(err => {
                console.log(err,'err');
            })


          // update localStorage
            const updatedUser = { ...userData, avatar: newAvatar.url }
            localStorage.setItem('user', JSON.stringify(updatedUser))

            
        }
      }

      console.log(avatar,'avatar');

    return (
        <nav className={style.navigation}>
            <div className={style.logo}>
                <Image src="/assets/logo.svg" alt="Logo" width={24} height={24} />
            </div>
            <div className={style.menu}>
                <Link href={"/home"}><button><Image src="/assets/icon-nav-home.svg" alt="Menu 1" width={16} height={16} /></button></Link>
                <Link href={"/film"}><button><Image src="/assets/icon-nav-movies.svg" alt="Menu 2" width={16} height={16} /></button></Link>
                <Link href={"/series"}><button><Image src="/assets/icon-nav-tv-series.svg" alt="Menu 3" width={16} height={16} /></button></Link>
                <Link href={"/bookmarked"}><button><Image src="/assets/icon-nav-bookmark.svg" alt="Menu 4" width={16} height={16} /></button></Link>
            </div>
            <div className={style.profilePic} onClick={handleAvatarClick}>
                <Image className={style.avatar} src={avatar} alt="Profile Picture" width={24} height={24} />
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </nav>
    )
}

export default NavBar