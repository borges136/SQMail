// import Image from 'next/image'
import logo from '@/public/logo.svg'
import poster1 from '@/public/poster1.png'
import poster2 from '@/public/poster2.png'
import poster3 from '@/public/poster3.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const startBtn = () => {
    return <button>Get started</button>
  }
  return (
    <main className="home-page">
      <header className="home-header flex-between">
        <Link href={'/'} className="logo flex items-center">
          <Image src={logo} alt="Logo" />
          <span>SQmail</span>
        </Link>
        <Link className='get-started-btn' href="/mail/inbox">Get started</Link>
      </header>
      <section className='home-content'>
        <div>
          <h1>Secure, smart, and easy to use email</h1>
          <h2>Get more done with SQmail.</h2>
          <h4>
            Collaborate faster, from any device, anytime, all in one place.
          </h4>
        </div>
        <div>
          <Image src={poster1}  alt='inbox'/>
        </div>
        <div>
          <Image className='w-3/5 mx-auto' src={poster2}  alt='dark mode'  />
        </div>
        <div>
          <h1>SQmail is better on the app</h1>
          <h2>Experience SQmail on any device</h2>
          <h4>Enjoy the ease and simplicity of SQmail, wherever you are.</h4>
        </div>
       
        <div>
          <h1>Email that's secure, private, and puts you in control.</h1>
          <h2>Get more done faster</h2>
          <h4>Write emails and messages faster to spend more time doing what you love.</h4>
        </div>
        <div>
          
          <Image src={poster3}  alt='compose image' />
        </div>
      </section>
    </main>
  )
}
