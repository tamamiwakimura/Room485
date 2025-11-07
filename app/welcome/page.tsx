"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth'; // ✅ เพิ่มเพื่อใช้ type ให้ชัดเจน

function Welcome() {
  const { data: session } = useSession(); // ✅ เปลี่ยนชื่อให้เป็นตัวเล็ก (ตามมาตรฐาน)
  console.log(session);

  return (
    <div>
      <Navbar session={session as Session | null} /> {/* ✅ ใส่ type cast ให้ตรง */}
      <h3>Welcome {session?.user?.name}</h3>
    </div>
  );
}

export default Welcome;
