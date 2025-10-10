import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
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
          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="default"
              className="bg-emerald-500 text-white hover:bg-emerald-400"
            >
              <Link to="/resume">Download Resume</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
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
          <Sheet>
            <SheetTrigger className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs border-none bg-slate-950/95 text-slate-100">
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold">
                  D
                </span>
                <span className="text-base font-semibold">DHANUS MANI S</span>
              </div>
              <div className="mt-8 space-y-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10",
                          isActive ? "text-white" : "text-slate-200/80",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-10 grid gap-3">
                <SheetClose asChild>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-emerald-500 text-white hover:bg-emerald-400"
                  >
                    <Link to="/resume">Download Resume</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    <a href="mailto:dhanusmani43@gmail.com">Email me</a>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-cyan-500 text-white hover:bg-cyan-400"
                  >
                    <Link to="/projects">View Work</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
