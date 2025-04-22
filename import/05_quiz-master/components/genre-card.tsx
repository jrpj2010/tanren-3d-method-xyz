"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Genre {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

interface GenreCardProps {
  genre: Genre
}

export default function GenreCard({ genre }: GenreCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <button
          onClick={() => setOpen(true)}
          className="w-full p-6 text-left"
          style={{ backgroundColor: `${genre.color}20` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl" style={{ color: genre.color }}>
              {genre.icon}
            </span>
            <h3 className="text-xl font-medium">{genre.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{genre.description}</p>
        </button>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span style={{ color: genre.color }}>{genre.icon}</span>
              {genre.name}
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground mb-4">{genre.description}</p>

          <div className="grid grid-cols-1 gap-3">
            <Link href={`/quiz/${genre.id}/easy`} passHref>
              <Button className="w-full" onClick={() => setOpen(false)}>
                初級
              </Button>
            </Link>
            <Link href={`/quiz/${genre.id}/medium`} passHref>
              <Button className="w-full" variant="outline" onClick={() => setOpen(false)}>
                中級
              </Button>
            </Link>
            <Link href={`/quiz/${genre.id}/hard`} passHref>
              <Button className="w-full" variant="outline" onClick={() => setOpen(false)}>
                上級
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
