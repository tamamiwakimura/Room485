"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth'; 
import { redirect } from 'next/navigation';

function Welcome() {
  const { data: session } = useSession(); 
  console.log(session);
  if(!session) redirect("/login");
  return (
    <div>
      <Navbar session={session as Session | null} /> 
      <h1>ยินดีต้อนรับคุณ {session?.user?.name} นะ </h1>
    </div>
  );
}

export default Welcome;
