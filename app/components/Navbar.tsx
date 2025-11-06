import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav>
        <div>
            <div>
                <div>
                    <Link href="/" >NexAuth</Link>
                </div>
                <ul>
                    <li><Link href="/login" >Sign In</Link></li>
                    <li><Link href="/register">Sign Up</Link></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar