import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    // find all movie with trending true
    const trendingFilms = await prisma.media.findMany({
        where: {
            isTrending: true
        }
    });

    console.log(trendingFilms);

    return NextResponse.json(trendingFilms);
}