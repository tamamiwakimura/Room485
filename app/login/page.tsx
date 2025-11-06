"use client"
import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
function RegisterPage() {
  return (
    <div>
        <Navbar />
        <div className='container mx-auto'>
            <h3>Login page</h3>
            <hr className='my-20'/>
            <form action="">
                <input type="text" placeholder='Enter your email' />
                <input type="text" placeholder='Enter your password' />
                <button type='submit'>Sign In</button>

            </form>
            <hr />
            <p>Go to <Link href="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage