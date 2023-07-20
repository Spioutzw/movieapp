import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    // find all movie with trending true
    const bookMarkedFilmsSeries = await prisma.media.findMany({
        where: {
            isBookmarked: true
        }
    });


    console.log(bookMarkedFilmsSeries,'bookMarkedFilmsSeries');



    return NextResponse.json(bookMarkedFilmsSeries);
}