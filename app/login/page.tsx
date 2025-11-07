"use client"
import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
function LoginPage() {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("SignIn result:", res);

    if (res?.error) {
      setError("Invalid credentials");
      return;
    }

    // ถ้า login สำเร็จ
    router.replace("/welcome");
  };
  return (
    <div>
        <Navbar />
        <div className='container mx-auto'>
            <h3>Login page</h3>
            <hr className='my-20'/>
            <form onSubmit={handleSubmit}>
              {error && (
                    <div>
                        {error}
                    </div>
                    
                )}
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Enter your email' />
                <input onChange={(e) => setPassword(e.target.value)}type="text" placeholder='Enter your password' />
                <button type='submit'>Sign In</button>

            </form>
            <hr />
            <p>Go to <Link href="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default LoginPage