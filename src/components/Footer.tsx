import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto py-12 lg:py-16">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-block mb-4">
                <span className="font-heading text-2xl font-bold text-foreground">
                  DevBridge<span className="text-accent">.</span>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Expert IT consultation for architecture, backend, cloud, and system design. 
                Direct access to senior-level engineering guidance.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  Home
                </Link>
                <a
                  href="#services"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  Services
                </a>
                <a
                  href="#booking"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  Book Consultation
                </a>
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  Admin Login
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Legal</h4>
              <nav className="flex flex-col gap-3">
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Terms & Conditions
                </Link>
                <span className="text-sm text-muted-foreground">
                  Privacy Policy
                </span>
              </nav>
              <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-xl">
                <p className="text-xs text-warning">
                  ⚠️ This is a demo website for educational purposes only.{' '}
                  <Link to="/terms" className="underline hover:no-underline">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} DevBridge Consult. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for demonstration
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
