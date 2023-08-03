

const urlPicture = {
  small: "https://image.tmdb.org/t/p/w185",
  medium: "https://image.tmdb.org/t/p/w500",
  large: "https://image.tmdb.org/t/p/original",
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

const toBase64 = str =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

    const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
    `

    const fetchDataTrending = async (setState) => {
      const response = await fetch(`/api/AllFetch?category=trending`);
      const data = await response.json();
      console.log(data,'data');
      setState(data.results);
    };
    
    const fetchPopularMovie = async (setState) => {
      const response = await fetch(`/api/AllFetch?category=popularMovie`);
      const data = await response.json();
      const popularMovies = data.results.map((item) => ({
        ...item,
        category: 'movie',
      }));
      setState(popularMovies);
    };
    
    const fetchTopRatedMovie = async (setState) => {
      const response = await fetch(`/api/AllFetch?category=topRatedMovie`);
      const data = await response.json();
      const topRatedMovies = data.results.map((item) => ({
        ...item,
        category: 'movie',
      }));
      setState(topRatedMovies);
    };
    
    const fetchUpcomingMovie = async (setState) => {
      const response = await fetch(`/api/AllFetch?category=upcomingMovie`);
      const data = await response.json();
      const upcomingMovies = data.results.map((item) => ({
        ...item,
        category: 'movie',
      }));
      setState(upcomingMovies);
    };
    
    const fetchPopularSerie = async (setState) => {
      const response = await fetch(`/api/AllFetch?category=popularSerie`);
      const data = await response.json();
      const popularSeries = data.results.map((item) => ({
        ...item,
        category: 'tv',
      }));
      setState(popularSeries);
    };
    
    const fetchUpcomingSerie = async (setState) => {
      const response = await fetch(`/api/AllFetch?category=upcomingSerie`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      const upcomingSeries = data.results.map((item) => ({
        ...item,
        category: 'tv',
      }));
      setState(upcomingSeries);
    };
    
    const fetchTopRatedSerie = async (setState) => {
      const response = await fetch(`/api/AllFetch?category=topRatedSerie`);
      const data = await response.json();
      const topRatedSeries = data.results.map((item) => ({
        ...item,
        category: 'tv',
      }));
      setState(topRatedSeries);
    };

    const addBookMarked = async (idMedia,setPopularMovies,setTrendingMedia,setPopularTvShows,setUpcomingTvShows,setTopRatedTvShows,setUpcomingMovies, setTopRatedMovies ) => {
      idMedia.map(async (id) => {
          const category = id.category;
          await fetch(`/api/AllFetch?category=${category}&mediaId=${id.mediaId}`)
          setPopularMovies((prevState) =>
              prevState.map((movie) =>
                  movie.id === parseInt(id.mediaId)
                      ? { ...movie, isBookmarked: id.isBooked }
                      : movie
              )
          );
          setTrendingMedia((prevState) =>
              prevState.map((media) =>
                  media.id === parseInt(id.mediaId)
                      ? { ...media, isBookmarked: id.isBooked }
                      : media
              )
          );
          setPopularTvShows((prevState) =>
              prevState.map((tvShow) =>
                  tvShow.id === parseInt(id.mediaId)
                      ? { ...tvShow, isBookmarked: id.isBooked }
                      : tvShow
              )
          );
          setUpcomingTvShows((prevState) =>
              prevState.map((tvShow) =>
                  tvShow.id === parseInt(id.mediaId)
                      ? { ...tvShow, isBookmarked: id.isBooked }
                      : tvShow
              )
          );
          setTopRatedTvShows((prevState) =>
              prevState.map((tvShow) =>
                  tvShow.id === parseInt(id.mediaId)
                      ? { ...tvShow, isBookmarked: id.isBooked }
                      : tvShow
              )
          );
          setUpcomingMovies((prevState) =>
              prevState.map((movie) =>
                  movie.id === parseInt(id.mediaId)
                      ? { ...movie, isBookmarked: id.isBooked }
                      : movie
              )
          );
          setTopRatedMovies((prevState) =>
              prevState.map((movie) =>
                  movie.id === parseInt(id.mediaId)
                      ? { ...movie, isBookmarked: id.isBooked }
                      : movie
              )
          );

      });
  };
    

export { getYear, urlPicture, renderRating, toBase64, shimmer, fetchDataTrending, fetchPopularMovie, fetchTopRatedMovie, fetchUpcomingMovie, fetchPopularSerie, fetchUpcomingSerie, fetchTopRatedSerie, addBookMarked }
