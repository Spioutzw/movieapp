// pages/api/register.js
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(req) {

    const { email, password } = await req.json();
    // check if email already exists
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (user) {
        return NextResponse.json({ message: 'email already exists' }, { status: 400 })
    } else {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userFromDb = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        
        return NextResponse.json(userFromDb);
    }



}