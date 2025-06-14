"use client"

import { useState } from "react"
import { useAppContext } from "@/context/AppContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, User, ArrowUpRight, Briefcase } from "lucide-react"
import Link from "next/link"
import StarRating from "@/components/StarRating"

export default function BookmarksPage() {
  const { state, removeBookmark } = useAppContext()
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const handlePromote = (userId: number, name: string) => {
    setActionMessage(`${name} has been marked for promotion.`)
    setTimeout(() => setActionMessage(null), 3000)
  }

  const handleAssignProject = (userId: number, name: string) => {
    setActionMessage(`${name} has been assigned to a new project.`)
    setTimeout(() => setActionMessage(null), 3000)
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bookmarked Employees</h1>
          <p className="text-muted-foreground">Manage your bookmarked employees</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Bookmark className="h-4 w-4 mr-1" />
          {state.bookmarkedUsers.length} Bookmarks
        </Badge>
      </div>

      {actionMessage && (
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 p-3 rounded-md mb-6 animate-fade-in">
          {actionMessage}
        </div>
      )}

      {state.bookmarkedUsers.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center">
              <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No bookmarked employees</h2>
              <p className="text-muted-foreground mb-6">
                You haven't bookmarked any employees yet. Bookmark employees to keep track of them.
              </p>
              <Button asChild>
                <Link href="/">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.bookmarkedUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      {user.firstName} {user.lastName}
                    </CardTitle>
                    <CardDescription>{user.department}</CardDescription>
                  </div>
                  <StarRating rating={user.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>{user.email}</p>
                    <p>Age: {user.age}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/employee/${user.id}`}>
                        <User className="h-4 w-4 mr-2" /> View Profile
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handlePromote(user.id, `${user.firstName} ${user.lastName}`)}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" /> Promote
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAssignProject(user.id, `${user.firstName} ${user.lastName}`)}
                    >
                      <Briefcase className="h-4 w-4 mr-2" /> Assign Project
                    </Button>

                    <Button variant="destructive" size="sm" className="flex-1" onClick={() => removeBookmark(user.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
