
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
const Nav = () => {
  const {data : session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log(response);
      setProviders(response);
    }
    setUpProviders();
  }, [])


   return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" width={30} height={30} className='object-contain' alt='promtopia logo'>
        </Image>
        <p className='logo_text'>Promtopia</p>
      </Link>

      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>Create prompt</Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign out</button>
            <Link href='/Profile'>
              <Image src={session?.user?.image}
                width={44}
                height={44}
                alt = "profile"></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers === null ? ( // Conditionally render loading indicator
              <div>Loading...</div>
            ) : (
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            )}
          </>
        )}
      </div>

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src="/assets/images/hamburg.png"
              width={39}
              height={39}
              className='round-full'
              alt='profile'
              onClick={()=>{setToggleDropdown((prev)=>!prev
                )}}
            />


            {toggleDropdown && (
              <div className='dropdown'>
                  <Link 
                  href="/Profile"
                  className='dropdown_link'
                  onClick={()=>{setToggleDropdown(false)}}
                  >My Profile
                  </Link>
                  <Link 
                  href="/create-prompt"
                  className='dropdown_link'
                  onClick={()=>{setToggleDropdown(false)}}
                  >Create Prompt
                  </Link>
                  <button className='mt-5 w-full black_btn' 
                    type = 'button' 
                    onClick={()=>{
                      setToggleDropdown(false);
                      signOut();
                    }}
                  >Sign Out</button>

                </div>
            )}
          </div>) :  <>
            {providers === null ? ( // Conditionally render loading indicator
              <div>Loading...</div>
            ) : (
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            )}
          </>
          }
     </div>
    </nav>
  )
}

export default Nav
