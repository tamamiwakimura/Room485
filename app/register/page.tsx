"use client"
import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
function RegisterPage() {
   
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const [success,setSuccess]=useState("");

    const {data:session} = useSession();
    if(session) redirect("/welcome");

    const handleSubmit = async (e) => {
        e.preventDefault(); //ป้องกันหน้าเว็ป refresh
        if(password != confirmPassword){
            setError("Password do not mathch");
            return;

        }

        if(!name || !email || !password || !confirmPassword){
            setError("please complete all input")
            return;
        }

        try{
          const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
            });


            if(res.ok){
                const form = e.target;
                setError("");
                setSuccess("User registration success");
                form.reset();
            }else{
                console.log("user registeration failed")
            }

        }catch(eror){
            console.log("Eror during registration",eror);
        }
    }
    return (
    <div>
        
        <div className='container mx-auto'>
            <h3>register page</h3>
            <hr className='my-20'/>
            <form onSubmit={handleSubmit}>

                {error && (
                    <div>
                        {error}
                    </div>
                    
                )}

                {success && (
                    <div>
                        {success}
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