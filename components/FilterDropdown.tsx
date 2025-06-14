"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"
import { useAppContext } from "@/context/AppContext"

interface FilterDropdownProps {
  departments: string[]
  ratings: number[]
}

export default function FilterDropdown({ departments, ratings }: FilterDropdownProps) {
  const { state, setFilters, clearFilters } = useAppContext()
  const [localDepartments, setLocalDepartments] = useState<string[]>(state.filters.department)
  const [localRatings, setLocalRatings] = useState<number[]>(state.filters.rating)
  const [open, setOpen] = useState(false)

  const handleDepartmentChange = (department: string) => {
    setLocalDepartments((prev) =>
      prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department],
    )
  }

  const handleRatingChange = (rating: number) => {
    setLocalRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const applyFilters = () => {
    setFilters({
      department: localDepartments,
      rating: localRatings,
    })
    setOpen(false)
  }

  const handleClearFilters = () => {
    setLocalDepartments([])
    setLocalRatings([])
    clearFilters()
    setOpen(false)
  }

  const totalActiveFilters = state.filters.department.length + state.filters.rating.length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filter</span>
          </div>
          {totalActiveFilters > 0 && (
            <Badge variant="secondary" className="ml-2">
              {totalActiveFilters}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Filters</h4>
            {totalActiveFilters > 0 && (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={handleClearFilters}>
                <X className="mr-1 h-3 w-3" />
                Clear all
              </Button>
            )}
          </div>

          <div>
            <h5 className="mb-2 text-sm font-medium">Department</h5>
            <div className="grid grid-cols-2 gap-2">
              {departments.map((department) => (
                <div key={department} className="flex items-center space-x-2">
                  <Checkbox
                    id={`department-${department}`}
                    checked={localDepartments.includes(department)}
                    onCheckedChange={() => handleDepartmentChange(department)}
                  />
                  <label
                    htmlFor={`department-${department}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {department}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-2 text-sm font-medium">Rating</h5>
            <div className="flex flex-wrap gap-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={localRatings.includes(rating)}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {rating} {rating === 1 ? "Star" : "Stars"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
