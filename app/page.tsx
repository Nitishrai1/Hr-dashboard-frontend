"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/context/AppContext"
import UserCard from "@/components/UserCard"
import SearchBar from "@/components/SearchBar"
import FilterDropdown from "@/components/FilterDropdown"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


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


const departments = ["Engineering", "Marketing", "HR", "Finance", "Sales", "Product", "Design"]

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { state, addBookmark, removeBookmark, setSearchQuery, setFilters } = useAppContext()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://dummyjson.com/users?limit=20")

        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }

        const data = await response.json()

      
        const transformedUsers = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department: departments[Math.floor(Math.random() * departments.length)],
          rating: Math.floor(Math.random() * 5) + 1,
          bookmarked: state.bookmarkedUsers.some((bookmarked) => bookmarked.id === user.id),
        }))

        setUsers(transformedUsers)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [state.bookmarkedUsers])


  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      state.searchQuery === "" ||
      user.firstName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(state.searchQuery.toLowerCase())

    const matchesDepartment =
      state.filters.department.length === 0 || state.filters.department.includes(user.department)

    const matchesRating = state.filters.rating.length === 0 || state.filters.rating.includes(user.rating)

    return matchesSearch && matchesDepartment && matchesRating
  })

  const handleToggleBookmark = (user: User) => {
    if (user.bookmarked) {
      removeBookmark(user.id)
    } else {
      addBookmark(user)
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">HR Performance Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <div className="w-full md:w-2/3">
          <SearchBar />
        </div>
        <div className="w-full md:w-1/3">
          <FilterDropdown departments={departments} ratings={[1, 2, 3, 4, 5]} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} onToggleBookmark={handleToggleBookmark} />)
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-muted-foreground">No employees found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
