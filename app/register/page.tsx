"use client"
import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
function RegisterPage() {
   
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); //ป้องกันหน้าเว็ป refresh
        if(password != confirmPassword){
            setError("Password do not mathch");
            return;

        }

        if(!name || !email || !password || confirmPassword){
            setError("please complete all input")
            return;
        }

        try{
            const res = await fetch("http://localhost:3000/api/register"{
                method: "POST",
                headers:{
                    "Contetnt-type": "application/json"
                },
                body: JSON.stringify({
                    name,email,password
                })
            })
        }catch(eror){
            console.log("Eror during registration",eror);

        }
    }
    return (
    <div>
        <Navbar />
        <div className='container mx-auto'>
            <h3>register page</h3>
            <hr className='my-20'/>
            <form onSubmit={handleSubmit}>

                {error && (
                    <div>
                        {error}
                    </div>
                    
                )}
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name' />
                <input onChange={(e) => setEmail(e.target.value)}type="text" placeholder='Enter your email' />
                <input onChange={(e) => setPassword(e.target.value)}type="text" placeholder='Enter your password' />
                <input onChange={(e) => setConfirmPassword(e.target.value)}type="text" placeholder='Enter confirm your password' />
                <button type='submit'>Sign Up</button>
            </form>
            <hr />
            <p>Go to <Link href="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage