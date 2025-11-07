import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "../../../models/user"
import bcrypt from 'bcryptjs'
export async function POST(req:NextRequest) {
    try{
        const {name, email,password} = await req.json();
        const hashedPassword = await bcrypt.hash(password,10);

        await connectMongoDB();
        await User.create({name,email,password:hashedPassword});
        
        console.log("Name:",name)
        console.log("Email:",email)
        console.log("Password:",password)

        return NextResponse.json({ message: "user registered"}, {status :201});
        }catch(error){
            return NextResponse.json({ message: "An eror"}, {status :500});
    }
}