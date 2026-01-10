// Navbar component
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  return (
    <nav 
      className={cn(
        'bg-gray-800 text-white py-4 px-6 flex justify-between items-center',
        className
      )}
    >
      <div className="text-xl font-bold">
        <Link href="/">Todo App</Link>
      </div>
      <div className="flex space-x-4">
        <Link 
          href="/todos" 
          className="hover:text-gray-300 transition-colors duration-200"
        >
          My Todos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;