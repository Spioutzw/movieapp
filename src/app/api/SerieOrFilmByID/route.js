import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";



export async function POST(req) {
    const body = await req.json();
    const { id } = body;
    // find movie or serie by id
    const trendingFilms = await prisma.media.findUnique({
        where: {
            id: id
    }});

    return NextResponse.json(trendingFilms);
}