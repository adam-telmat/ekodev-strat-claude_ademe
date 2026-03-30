import { navLinks } from "@/lib/data";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-[60px] py-5 flex justify-between items-center bg-background/80 backdrop-blur-xl border-b border-foreground/[0.04]">
    <div className="font-heading font-extrabold text-base text-foreground">
      Adam Telmat <span className="text-primary-glow">×</span> ekodev
    </div>
    <ul className="hidden md:flex gap-8 list-none">
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-3 no-underline transition-colors duration-200 hover:text-primary-glow"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
