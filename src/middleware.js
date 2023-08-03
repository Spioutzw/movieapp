import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if ((req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')) && isAuthenticated) {
    return NextResponse.redirect(new URL('/home', req.url));
  } else if (!isAuthenticated && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
    // Ne pas rediriger l'utilisateur s'il n'est pas authentifié et essaie d'accéder aux pages de connexion ou d'inscription
    return;
  } else if (!isAuthenticated) {
    // Rediriger les utilisateurs non connectés vers la page de connexion s'ils essaient d'accéder à d'autres pages
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
}


export const config = { 
    matcher: ["/home", "/film","/film/:path*","/series","/series/:path*","/bookmarked","/login","/register","/searchBar","/searchBar/:path*"]
}