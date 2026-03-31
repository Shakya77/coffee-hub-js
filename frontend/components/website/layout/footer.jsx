import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import WebLogo from "./logo";

export default function Footer() {
  const quickLinks = [
    { label: "Expert Blogs", href: "#" },
    { label: "Getting Started", href: "#" },
    { label: "Disease Checker", href: "#" },
    { label: "FAQs", href: "#" },
  ];

  const resources = [
    { label: "Hire Workers", href: "#" },
    { label: "Community Guidelines", href: "#" },
    { label: "Product Showcase", href: "#" },
    { label: "Contact Support", href: "#" },
  ];

  const company = [
    { label: "Dictionary", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  const contact = [
    { label: "email", value: "hello@bijanshakya.com" },
    { label: "phone", value: "+977 9842092600" },
    { label: "address", value: "Kathmandu, Nepal" },
  ];

  return (
    <footer className="bg-foreground text-background py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <WebLogo />
          </Link>
          <p className="text-background/70 text-sm">
            Empowering Nepal's coffee farming ecosystem through information,
            connection, and community.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-background mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-background mb-4">Resources</h3>
          <ul className="space-y-2">
            {resources.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-background mb-4">Company</h3>
          <ul className="space-y-2">
            {company.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-background mb-4">Get In Touch</h3>
          <div className="space-y-3">
            <a
              href={`mailto:${contact[0].value}`}
              className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm"
            >
              <Mail size={16} />
              <span>{contact[0].value}</span>
            </a>
            <a
              href={`tel:${contact[1].value}`}
              className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm"
            >
              <Phone size={16} />
              <span>{contact[1].value}</span>
            </a>
            <div className="flex items-center gap-2 text-background/70 text-sm">
              <MapPin size={16} />
              <span>{contact[2].value}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/20 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Coffee Info Hub Nepal. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-background/60 hover:text-background transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-background/60 hover:text-background transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
