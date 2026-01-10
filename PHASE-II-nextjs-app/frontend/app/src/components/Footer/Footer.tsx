export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-12 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/60 text-center md:text-left">
            © {new Date().getFullYear()} TodoMaster. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Terms of Service"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}