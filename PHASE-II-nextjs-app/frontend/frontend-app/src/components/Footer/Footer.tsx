// Footer component
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className={cn(
        'bg-gray-800 text-white py-6 px-6 mt-auto',
        className
      )}
    >
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} Todo App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;