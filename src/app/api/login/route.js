// pages/api/register.js
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(req) {


    const { email, password } = await req.json();

    console.log(email, password, 'email, password')

    // find the user in the database with email 
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    // check password 

    if (!user) {
        console.log(" email not found");
        return NextResponse.json({ message: 'email not found' }, { status: 400 })
        
    } else {

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            console.log("password not valid");
            return NextResponse.json({ message: 'password not valid' }, { status: 400 })
        } else {
            console.log("password valid");
            return NextResponse.json(user);
        }
    }

}