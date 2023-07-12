'use client'

import NavBar from '@/components/NavBar/NavBar'
import SearchBar from '@/components/SearchBar/SearchBar'
import React from 'react'

function page() {

  if(!localStorage.getItem('user')) {
    window.location.href = '/login';
    return null;
  }

  const userData = JSON.parse(localStorage.getItem('user'));
  console.log(userData);

   const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  }

  return (
    <>
      <NavBar />
      <SearchBar />
      <div> Salut {userData?.email}</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default page