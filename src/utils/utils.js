

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
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setState(data.results);
    };
  
    const fetchPopularMovie = async (setState) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      const popularMovies = data.results.map((item) => ({
        ...item,
        category: 'movie',
      }));
      setState(popularMovies);
    };
  
    const fetchTopRatedMovie = async (setState) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      const topRatedMovies = data.results.map((item) => ({
        ...item,
        category: 'movie',
      }));
      setState(topRatedMovies);
    };
  
    const fetchUpcomingMovie = async (setState) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      const upcomingMovies = data.results.map((item) => ({
        ...item,
        category: 'movie',
      }));
      setState(upcomingMovies);
    };
  
  
    const fetchPopularSerie = async (setState) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      const popularSeries = data.results.map((item) => ({
        ...item,
        category: 'tv',
      }));
      setState(popularSeries);
    };
  
    const fetchUpcomingSerie = async (setState) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      const upcomingSeries = data.results.map((item) => ({
        ...item,
        category: 'tv',
      }));
      setState(upcomingSeries);
    };
  
    const fetchTopRatedSerie = async (setState) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      const topRatedSeries = data.results.map((item) => ({
        ...item,
        category: 'tv',
      }));
      setState(topRatedSeries);
    };

export { getYear, urlPicture, renderRating, toBase64, shimmer, fetchDataTrending, fetchPopularMovie, fetchTopRatedMovie, fetchUpcomingMovie, fetchPopularSerie, fetchUpcomingSerie, fetchTopRatedSerie }
