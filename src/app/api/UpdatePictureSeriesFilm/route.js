import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function PATCH(req) {
    const body = await req.json();

    const { id, thumbnail } = body;

    console.log(id, thumbnail,'id, thumbnail');

    if (id || thumbnail) {
        // Update the image URLs of the movie with the given id in your database
        try {
            await prisma.media.update({
                where: { id },
                data: {
                    thumbnail: {
                        regular: {
                            small: `https://image.tmdb.org/t/p/w185${thumbnail}`,
                            medium: `https://image.tmdb.org/t/p/w500${thumbnail}`,
                            large: `https://image.tmdb.org/t/p/original${thumbnail}`
                        }
                    }
                }
            });
           return NextResponse.json({ message: 'Picture updated successfully' }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
    } else {

       return NextResponse.json({ message: 'Missing id or thumbnail' }, { status: 400 });
    }
} 