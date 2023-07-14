import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";



export async function GET() {
    // find all movie
    const trendingFilms = await prisma.media.findMany({
        where: {
            category: 'Movie'
    }});

    return NextResponse.json(trendingFilms);
}