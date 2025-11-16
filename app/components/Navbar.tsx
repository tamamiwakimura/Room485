"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth"; // ✅ เพิ่มบรรทัดนี้

// ✅ ใส่ type ให้ session
const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav>
      <div>
        <div>
          <div>
            <Link href="/">NextAuth</Link>
          </div>
          <ul>
            {!session ? (
              <>
                <li>
                  <Link href="/login">Sign In</Link>
                </li>
                <li>
                  <Link href="/register">Sign Up</Link>
                </li>
              </>
            ) : (
              <li>
                <a
                  href="#"
                  onClick={() => signOut({ callbackUrl: "/login" })} // ✅ แนะนำให้ใส่ callbackUrl
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
