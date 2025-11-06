import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const {name, email,password} = await req.json();
        console.log("Name:",name)
        console.log("Email:",email)
        console.log("Password:",password)

        return NextResponse.json({ message: "user registered"}, {status :201});
        }catch(error){
            return NextResponse.json({ message: "An eror"}, {status :500});
    }
}