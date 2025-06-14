"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useAppContext } from "@/context/AppContext"

export default function SearchBar() {
  const [localSearch, setLocalSearch] = useState("")
  const { setSearchQuery } = useAppContext()

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch)
    }, 300)

    return () => clearTimeout(timer)
  }, [localSearch, setSearchQuery])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name, email, or department..."
        className="pl-10"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  )
}
