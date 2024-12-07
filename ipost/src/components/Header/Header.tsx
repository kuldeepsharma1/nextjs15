'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'
import ThemeSwitch from '../ThemeSwitch'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import Logo from '../Logo'

interface NavigationItem {
  name: string
  href: string
}

interface UserNavigationItem {
  name: string
  href: string
}


const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'About', href: '/about' },
]

const userNavigation: UserNavigationItem[] = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const pathname = usePathname()
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const router = useRouter()

  // Scroll-related states
  const [isVisible, setIsVisible] = useState(true)
  let lastScrollY = 0

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      lastScrollY = window.scrollY
    }
  }

  // Add scroll event listener on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Handle Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      if (response.status === 200) {
        setIsAuthenticated(false)
        router.push('/login')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  return (
    <>
      <Disclosure id='header-nav' as="nav" className={`bg-zinc-100 dark:bg-zinc-800 ${isVisible ? 'top-0' : '-top-16'}  transition-all duration-300 fixed w-full z-50`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Logo />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Link href={item.href} className="block px-4 py-2 text-sm text-gray-700">
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}

                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <MenuItem>
                          <Link href="/login" className="block px-4 py-2 text-sm text-gray-700">
                            Login
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href="/register" className="block px-4 py-2 text-sm text-gray-700">
                            Register
                          </Link>
                        </MenuItem>
                      </>
                    )}
                  </MenuItems>
                </Menu>

                <ThemeSwitch />
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open main menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
                </svg>
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="flex flex-col space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                >
                  {item.name}
                </Link>
              </DisclosureButton>
            ))}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block w-full px-3 py-2 text-left text-white bg-red-500 hover:bg-red-600 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <DisclosureButton>
                  <Link href="/login" className="block px-3 py-2 text-left text-gray-700 hover:bg-gray-600 rounded-md">
                    Login
                  </Link>
                </DisclosureButton>
                <DisclosureButton>
                  <Link href="/register" className="block px-3 py-2 text-left text-gray-700 hover:bg-gray-600 rounded-md">
                    Register
                  </Link>
                </DisclosureButton>
              </>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  )
}
