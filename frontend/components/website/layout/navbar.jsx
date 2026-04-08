import Link from "next/link";
import WebLogo from "./logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Blogs", href: "/blogs" },
  { label: "Dictionary", href: "/dictionary" },
  { label: "Jobs", href: "/jobs" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-forest/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <WebLogo />
        <div className="hidden items-center gap-8 text-base font-medium text-forest md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-primary hover:font-semibold hover:underline hover:underline-offset-8"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
