import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


export async function GET(request) {
    // find all series
    const allSeries = await prisma.media.findMany({
        where: {
            category: 'TV Series'
        }
    });

    //To dynamically get the path
    const path = request.nextUrl.searchParams.get("path") || "/";
    revalidatePath(path);

    return NextResponse.json(allSeries);
}