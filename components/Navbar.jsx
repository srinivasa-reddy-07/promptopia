"use client"
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = useSession()

  const [toggleDropdown, setToggleDropdown] = useState(false)

  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    fetchProviders()
  }, [])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="Profile icon"
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                className="black_btn"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex cursor-pointer">
            <Image
              src={session?.user.image}
              alt="Profile icon"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown(
                (prevState) => !prevState
              )}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link 
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link 
                  className="dropdown_link"
                  href="/create-prompt"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                className="black_btn"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
