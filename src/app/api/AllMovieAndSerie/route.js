import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";



export async function GET() {
    // find all movie
    const trendingFilms = await prisma.media.findMany();

    return NextResponse.json(trendingFilms);
}

export async function PATCH(req) {
    const body = await req.json();
    const { filmId, isBookmarked } = body;
   
    console.log(body,'req.body')
    console.log(isBookmarked,'isBookmarked');
    console.log(filmId,'filmId');

    // Update bookmark status in database
    await prisma.media.update({
        where: { id: filmId },
        data: { isBookmarked },
    });

    if (!filmId) {
        return NextResponse.error({
            status: 400,
            message: "Missing filmId parameter",
        });
    }

    if (typeof isBookmarked !== "boolean") {
        return NextResponse.error({
            status: 400,
            message: "Missing isBookmarked parameter",
        });
    }



    return NextResponse.json({ message: "Bookmark status updated" });
}
