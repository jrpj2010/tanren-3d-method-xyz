import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

export function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="icon" disabled>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">前のページ</span>
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        1
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">...</span>
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        4
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        5
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        6
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">...</span>
      </Button>
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        10
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">次のページ</span>
      </Button>
    </div>
  )
}
