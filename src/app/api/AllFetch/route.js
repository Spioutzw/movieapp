import { NextResponse } from "next/server";


async function handler(req) {

    const category = req.nextUrl.searchParams.get('category');
    const mediaId = req.nextUrl.searchParams.get('mediaId');
    const query = req.nextUrl.searchParams.get('query');
    const media_type = req.nextUrl.searchParams.get('media_type');
    const with_genres = req.nextUrl.searchParams.get('with_genres');

    let apiUrl;
    switch (category) {
        case 'trending':
            apiUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'idMedia':
            apiUrl = `https://api.themoviedb.org/3/${media_type}/${mediaId}?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'popularMovie':
            apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'topRatedMovie':
            apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'upcomingMovie':
            apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'popularSerie':
            apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'upcomingSerie':
            apiUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'topRatedSerie':
            apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'search':
            apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY_TMDB}&query=${query}`;
            break;
        case 'Info':
            apiUrl = `https://api.themoviedb.org/3/${media_type}/${mediaId}?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'Video':
            apiUrl = `https://api.themoviedb.org/3/${media_type}/${mediaId}/videos?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'Credits':
            apiUrl = `https://api.themoviedb.org/3/${media_type}/${mediaId}/credits?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'Genre':
            apiUrl = `https://api.themoviedb.org/3/genre/${media_type}/list?api_key=${process.env.API_KEY_TMDB}`;
            break;
        case 'GenreMedia':
            apiUrl = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${process.env.API_KEY_TMDB}&with_genres=${with_genres}`;
            console.log(apiUrl, 'apiUrl')
            break;
        default:
            return NextResponse.json(({ status: 404 }, { error: 'Not Found' }));

    }
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return NextResponse.json(data);
}

export { handler as GET, handler as POST }
