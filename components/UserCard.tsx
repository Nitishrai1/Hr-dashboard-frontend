"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Bookmark, BookmarkCheck, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import StarRating from "@/components/StarRating"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  rating: number
  bookmarked?: boolean
}

interface UserCardProps {
  user: User
  onToggleBookmark: (user: User) => void
}

export default function UserCard({ user, onToggleBookmark }: UserCardProps) {
  const handlePromote = () => {
 
    alert(`${user.firstName} ${user.lastName} has been marked for promotion.`)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>
            {user.firstName} {user.lastName}
          </CardTitle>
          <StarRating rating={user.rating} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>{user.email}</p>
            <div className="flex justify-between mt-1">
              <span>Age: {user.age}</span>
              <Badge variant="outline">{user.department}</Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href={`/employee/${user.id}`}>
                <Eye className="h-4 w-4 mr-2" /> View
              </Link>
            </Button>

            <Button
              variant={user.bookmarked ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => onToggleBookmark(user)}
            >
              {user.bookmarked ? (
                <>
                  <BookmarkCheck className="h-4 w-4 mr-2" /> Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 mr-2" /> Bookmark
                </>
              )}
            </Button>

            <Button variant="outline" size="sm" className="flex-1" onClick={handlePromote}>
              <ArrowUpRight className="h-4 w-4 mr-2" /> Promote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
