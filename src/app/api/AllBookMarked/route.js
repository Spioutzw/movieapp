import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route"




export async function GET() {
    const session = await getServerSession(authOptions);
    const allBookmarked = await prisma.bookmark.findMany({
        where: {
            userId: session.user.infoUser.id
        },

      });
      return NextResponse.json(allBookmarked);
    }


export async function POST(req) {
     const body = await req.json();
      const { filmId, category } = body;
    
    const session = await getServerSession(authOptions);

    console.log(session, 'session');
    console.log(filmId, 'filmId');
  
    if (!filmId) {
      return NextResponse.json({
        message: "Missing filmId parameter",
      }, {
        status: 400,
      });
    }
    // Create new bookmark in database
    try {
      await prisma.bookmark.create({
        data: {
          mediaId: filmId,
          isBooked: true,
          category: category,
          user: {
            connect: {
              id: session.user.infoUser.id,
        },
      }
      }});
    
      return NextResponse.json({ message: "Bookmark created" });
    } catch (error) {
      return NextResponse.json({
        message: error.message,
      }, {
        status: 400,
      });
    }
  }
  
  export async function DELETE(req) {
    
    const session = await getServerSession(authOptions);
    const { searchParams } = req.nextUrl;
    
    const filmId = searchParams.get('id');
  
    if (!filmId) {
      return NextResponse.json({
        error : 'Missing filmId parameter'
      },
      {
        status: 400,
      }
       );
    }
    try {
      await prisma.bookmark.deleteMany({
      where: {
        mediaId: filmId,
        // Replace with the ID of the currently authenticated user
        userId: session.user.infoUser.id,

        
      },
    })
      return NextResponse.json({ message: "Bookmark deleted" });
    } catch (error) {
      return NextResponse.json({
        message: error.message,
      }, {
        status: 400,
      });
    }
    // Delete bookmark from database
  
    
  }