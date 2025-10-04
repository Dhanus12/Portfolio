import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 text-slate-100 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold">
            D
          </span>
          <span className="font-semibold text-lg">DHANUS MANI S</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative pb-1 text-sm transition-colors hover:text-cyan-200",
                  isActive ? "text-white" : "text-slate-200/80",
                )
              }
            >
              {({ isActive }) => (
                <span className="relative inline-block">
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-300"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                      }}
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-white/20 text-slate-100 hover:bg-white/10 hover:text-white"
          >
            <a href="mailto:dhanusmani43@gmail.com">Email me</a>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-cyan-500 text-white hover:bg-cyan-400"
          >
            <a href="/projects">View Work</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
