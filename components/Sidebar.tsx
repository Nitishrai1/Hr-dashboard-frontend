"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LayoutDashboard, Users, Bookmark, BarChart, Menu, X, LogOut } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Employees",
      href: "/",
      icon: Users,
    },
    {
      name: "Bookmarks",
      href: "/bookmarks",
      icon: Bookmark,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart,
    },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </Button>

      <div
        className={`fixed inset-0 z-40 transform bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full w-64 flex-col bg-background p-4 shadow-lg">
          <div className="flex items-center justify-between mb-8 pt-2">
            <Link href="/" className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold">HR Dashboard</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <ModeToggle />
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:w-64 md:min-h-screen border-r bg-background">
        <div className="flex items-center justify-center h-16 px-4 border-b">
          <Link href="/" className="flex items-center">
            <Users className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">HR Dashboard</span>
          </Link>
        </div>
        <div className="flex flex-col flex-1 px-3 py-4">
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-4 pt-4">
            <ModeToggle />
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
