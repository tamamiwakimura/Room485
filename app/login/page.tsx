"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
const page = () => {
    const {data:session} = useSession()
    if(session){
        <>
        Signed in as {session.user?.email} <br/>
        <button onClick={()=>signOut()}>signOut</button>
        </>
    }
  return (
    <>
        Not sign In <br/>
        <button onClick={()=>signIn()}>signIn</button>
    </>
  )
}

export default page