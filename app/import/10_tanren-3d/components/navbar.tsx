"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Rocket, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // カウントダウンタイマー
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            TANREN 3D
          </Link>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white animate-pulse hidden sm:flex">
              <Calendar className="mr-1 h-3 w-3" />
              あと{countdown.days}日
            </Badge>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            ホーム
          </Link>
          <Link href="/manual" className="text-sm font-medium hover:underline underline-offset-4">
            マニュアル
          </Link>
          <Link href="/demo" className="text-sm font-medium hover:underline underline-offset-4">
            デモ
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            概要
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/demo">
            <Button className="hidden md:flex bg-red-600 hover:bg-red-700">
              <Rocket className="mr-2 h-4 w-4" />
              今すぐ始める
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium" onClick={toggleMenu}>
              ホーム
            </Link>
            <Link href="/manual" className="text-sm font-medium" onClick={toggleMenu}>
              マニュアル
            </Link>
            <Link href="/demo" className="text-sm font-medium" onClick={toggleMenu}>
              デモ
            </Link>
            <Link href="/about" className="text-sm font-medium" onClick={toggleMenu}>
              概要
            </Link>
            <Link href="/demo" onClick={toggleMenu}>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Rocket className="mr-2 h-4 w-4" />
                今すぐ始める
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
