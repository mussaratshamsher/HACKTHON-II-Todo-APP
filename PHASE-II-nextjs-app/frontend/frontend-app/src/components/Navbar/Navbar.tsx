'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Menu, LogIn, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/todos?search=${searchQuery}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push('/login');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 flex flex-wrap items-center justify-between px-4 sm:px-6 py-4 text-white transition-all duration-300',
        scrolled
          ? 'bg-gray-800/90 backdrop-blur shadow-lg'
          : 'bg-gray-900/90',
        className
      )}
    >
      <div className="text-2xl font-bold tracking-tight">
        <Link
          href="/"
          className="hover:animate-pulse fade-in transition-colors duration-200"
        >
          Todo App
        </Link>
      </div>

      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          'w-full md:flex md:items-center md:w-auto overflow-hidden transition-all duration-300 ease-in-out',
          isMenuOpen
            ? 'max-h-screen opacity-100 py-4 md:py-0'
            : 'max-h-0 opacity-0 md:max-h-screen md:opacity-100'
        )}
      >
        <div className="flex justify-center px-4 my-4 md:my-0 focus:ring-2 focus:ring-primary">
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <div className="relative">
              <input
                type="search"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700/90 text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0 text-center text-lg md:text-base mt-4 md:mt-0">
          <Link
            href="/todos"
            className="font-medium hover:text-primary transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            My Todos
          </Link>
          {user ? (
            <div className="relative group">
              <Link href="/profile" className="flex items-center font-medium hover:text-primary transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-8 w-8 rounded-full mr-2"
                    referrerPolicy="no-referrer" // Helps prevent issues with some image hosts
                  />
                ) : (
                  <User className="h-5 w-5 mr-1" />
                )}
                <span>{user.displayName || user.email}</span>
              </Link>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center font-medium hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="h-5 w-5 mr-1" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
