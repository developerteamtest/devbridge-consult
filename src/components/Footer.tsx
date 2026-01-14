import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-heading text-lg font-bold text-foreground">
            DevBridge<span className="text-accent">.</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Login
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {currentYear} DevBridge Consult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
