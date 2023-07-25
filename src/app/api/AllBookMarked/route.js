import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req) {
    const { filmId } = req.query;
  
    if (!filmId) {
      return NextResponse.error({
        status: 400,
        message: "Missing filmId parameter",
      });
    }
  
    // Create new bookmark in database
    await prisma.bookmark.create({
      data: {
        mediaId: filmId,
        // Replace with the ID of the currently authenticated user
        userId: "authenticatedUserId",
      },
    });
  
    return NextResponse.json({ message: "Bookmark created" });
  }
  
  export async function DELETE(req) {
    const { filmId } = req.query;
  
    if (!filmId) {
      return NextResponse.error({
        status: 400,
        message: "Missing filmId parameter",
      });
    }
  
    // Delete bookmark from database
    await prisma.bookmark.deleteMany({
      where: {
        mediaId: filmId,
        // Replace with the ID of the currently authenticated user
        userId: "authenticatedUserId",
      },
    });
  
    return NextResponse.json({ message: "Bookmark deleted" });
  }