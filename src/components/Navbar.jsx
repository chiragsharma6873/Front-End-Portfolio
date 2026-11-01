import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("#work");
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // Escape closes the mobile menu.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="flex items-center justify-between gap-6 px-4 py-2 bg-[#090a0f]/75 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50 text-sm"
      >
        {/* Logo / Name */}
        <a
          className="font-bold tracking-wider text-white px-3 py-1.5 hover:opacity-80 transition-opacity"
          href="#top"
          onClick={closeMenu}
          aria-label="Ankush Pundeer, home"
        >
          CS<span className="text-[#c6ff6b]">.</span>
        </a>

        {/* Centered Navigation Links with Inner Pill Active State */}
        <ul className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
          {links.map((link) => {
            const isActive = activeTab === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.href);
                    closeMenu();
                  }}
                  className={`px-4 py-1.5 rounded-full transition-all duration-200 font-medium block ${
                    isActive
                      ? "bg-white/10 text-white shadow-inner border border-white/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={closeMenu}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#c6ff6b] !text-zinc-950 font-semibold hover:bg-[#d4ff85] transition-all shadow-lg shadow-[#c6ff6b]/10"
          >
            Let's talk <ArrowUpRight size={15} className="text-zinc-950" />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((value) => !value)}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-current transition-transform ${open ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-transform ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-20 left-4 right-4 bg-[#090a0f]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 md:hidden shadow-2xl">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#c6ff6b] text-zinc-950 font-semibold hover:bg-[#d4ff85] transition-all"
          >
            Let's talk <ArrowUpRight size={16} className="text-zinc-950" />
          </a>
        </div>
      )}
    </header>
  );
}
