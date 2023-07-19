// pages/api/updateAvatar.js
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  
    // Get the user's email and new avatar URL from the request body
    const body = await req.json()
    const { email, avatar } = body

    // Update the user's avatar in the database using Prisma
    await prisma.user.update({
      where: { email },
      data: { avatar }
    })

    return NextResponse.json({ message: 'Avatar updated' })
 
}
