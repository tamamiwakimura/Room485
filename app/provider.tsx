"use client"
import { SessionProvider } from "next-auth/react"
import { Children } from "react"
export const CustomProviders =({
    children
}:{
    children:React.ReactNode
}) =>{
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}