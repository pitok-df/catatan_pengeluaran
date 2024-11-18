'use client'

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);

  return (
    <>
      {session.status !== "authenticated" ?
        <button className="btn btn-primary" onClick={() => { signIn() }}>login</button>
        :
        <button className="btn btn-primary" onClick={() => { signOut() }}>logout</button>
      }
    </>
  );
}
