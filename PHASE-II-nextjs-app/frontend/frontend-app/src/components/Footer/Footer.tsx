import { cn } from '@/lib/utils';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'bg-gray-800 text-gray-800 dark:text-gray-200 py-6 px-4 sm:px-6 mt-12 shadow-inner fade-in'
      )}
    >
      <div className="container mx-auto text-center text-sm">
        <p className="mb-2">
          &copy; {currentYear} Todo App. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="https://www.linkedin.com/in/mussarat-shamsher-7618a6380/" target='blank' className="hover:text-blue-200 transition-colors duration-200">
            Developer:
          </Link>
          <Link href="https://mussarat-web-dev.vercel.app/" target='blank' className="hover:text-blue-200 transition-colors duration-200">
            Mussarat Shamsher
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;