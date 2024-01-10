// import Image from 'next/image'

import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <h2>home</h2>
      <Link href="/mail/inbox">get started</Link>
    </main>
  )
}
