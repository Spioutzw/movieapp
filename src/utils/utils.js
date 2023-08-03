

const urlPicture  = {
    small : "https://image.tmdb.org/t/p/w185",
    medium : "https://image.tmdb.org/t/p/w500",
    large : "https://image.tmdb.org/t/p/original",
}


const getYear = (dateString) => {
    return dateString.split('-')[0];
  }

 const renderRating = (rating) => {
    if (rating !== undefined) {
      return (rating / 2).toFixed(1)
    } else {
      return 0
    }
  }

export { getYear, urlPicture, renderRating}
