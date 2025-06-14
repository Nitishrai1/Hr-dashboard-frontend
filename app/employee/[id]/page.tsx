"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAppContext } from "@/context/AppContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, Phone, Mail, Bookmark, BookmarkCheck } from "lucide-react"
import StarRating from "@/components/StarRating"
import Link from "next/link"



const mockProjects = [
  { id: 1, name: "Website Redesign", status: "In Progress", completion: 75 },
  { id: 2, name: "Employee Onboarding System", status: "Completed", completion: 100 },
  { id: 3, name: "Performance Review Tool", status: "Planning", completion: 20 },
  { id: 4, name: "HR Policy Update", status: "In Review", completion: 90 },
]

const mockFeedback = [
  {
    id: 1,
    from: "Jane Smith",
    role: "Manager",
    date: "2023-04-15",
    content: "Excellent communication skills and team collaboration.",
  },
  {
    id: 2,
    from: "John Doe",
    role: "Peer",
    date: "2023-03-22",
    content: "Always willing to help others and share knowledge.",
  },
  {
    id: 3,
    from: "Sarah Johnson",
    role: "Director",
    date: "2023-02-10",
    content: "Consistently delivers high-quality work ahead of schedule.",
  },
]

const generatePerformanceHistory = (rating: number) => {
  const history = []
  const currentYear = new Date().getFullYear()

  for (let i = 0; i < 5; i++) {
    const yearRating = Math.max(1, Math.min(5, rating + Math.floor(Math.random() * 3) - 1))
    history.push({
      year: currentYear - i,
      rating: yearRating,
      review: getReviewText(yearRating),
    })
  }

  return history
}

const getReviewText = (rating: number) => {
  switch (rating) {
    case 1:
      return "Needs significant improvement in core responsibilities."
    case 2:
      return "Meeting some expectations but improvement needed."
    case 3:
      return "Consistently meets expectations and requirements."
    case 4:
      return "Exceeds expectations in most areas."
    case 5:
      return "Outstanding performance across all responsibilities."
    default:
      return "No review available."
  }
}

const getRatingColor = (rating: number) => {
  switch (rating) {
    case 1:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case 2:
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case 3:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case 4:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case 5:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function EmployeeDetails() {
  const params = useParams()
  const { state, addBookmark, removeBookmark } = useAppContext()
  const [employee, setEmployee] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [performanceHistory, setPerformanceHistory] = useState<any[]>([])

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://dummyjson.com/users/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch employee details")
        }

        const data = await response.json()

        // Adding mock department and rating
        const departments = ["Engineering", "Marketing", "HR", "Finance", "Sales", "Product", "Design"]
        const mockEmployee = {
          ...data,
          department: departments[Math.floor(Math.random() * departments.length)],
          rating: Math.floor(Math.random() * 5) + 1,
          bio: "Dedicated professional with a passion for innovation and problem-solving. Consistently delivers high-quality work and collaborates effectively with cross-functional teams.",
          bookmarked: state.bookmarkedUsers.some((user) => user.id === data.id),
        }

        setEmployee(mockEmployee)
        setPerformanceHistory(generatePerformanceHistory(mockEmployee.rating))
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEmployee()
    }
  }, [params.id, state.bookmarkedUsers])

  const handleToggleBookmark = () => {
    if (!employee) return

    if (employee.bookmarked) {
      removeBookmark(employee.id)
      setEmployee({ ...employee, bookmarked: false })
    } else {
      const bookmarkUser = {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        age: employee.age,
        department: employee.department,
        rating: employee.rating,
      }
      addBookmark(bookmarkUser)
      setEmployee({ ...employee, bookmarked: true })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="text-red-500 text-xl mb-4">Error: {error || "Employee not found"}</div>
        <Button asChild>
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">
            {employee.firstName} {employee.lastName}
          </h1>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={handleToggleBookmark} variant="outline">
            {employee.bookmarked ? (
              <>
                <BookmarkCheck className="mr-2 h-4 w-4" /> Bookmarked
              </>
            ) : (
              <>
                <Bookmark className="mr-2 h-4 w-4" /> Bookmark
              </>
            )}
          </Button>
          <Button>Promote</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Employee Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={employee.image || "/placeholder.svg"}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-muted-foreground">{employee.department}</p>
              <div className="mt-2 flex items-center">
                <StarRating rating={employee.rating} />
                <Badge className={`ml-2 ${getRatingColor(employee.rating)}`}>{employee.rating}/5</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{employee.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{employee.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {employee.address.address}, {employee.address.city}, {employee.address.state}{" "}
                    {employee.address.postalCode}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Employee performance history and current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Bio</h3>
              <p className="text-muted-foreground">{employee.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Performance History</h3>
              <div className="space-y-4">
                {performanceHistory.map((history, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{history.year}</span>
                      <div className="flex items-center">
                        <StarRating rating={history.rating} />
                        <Badge className={`ml-2 ${getRatingColor(history.rating)}`}>{history.rating}/5</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{history.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Overview</CardTitle>
              <CardDescription>Summary of {employee.firstName}'s performance and responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Communication",
                      "Leadership",
                      "Problem Solving",
                      "Teamwork",
                      "Time Management",
                      "Technical Knowledge",
                    ].map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Lead team meetings and project planning sessions</li>
                    <li>Develop and implement department strategies</li>
                    <li>Mentor junior team members</li>
                    <li>Collaborate with cross-functional teams</li>
                    <li>Report on key performance metrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
              <CardDescription>Projects {employee.firstName} is currently working on</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      <Badge variant={project.status === "Completed" ? "default" : "outline"}>{project.status}</Badge>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full mt-2">
                      <div className="bg-primary h-2 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{project.completion}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Feedback</CardTitle>
              <CardDescription>Recent feedback from managers and peers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockFeedback.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{feedback.from}</h3>
                        <p className="text-sm text-muted-foreground">{feedback.role}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{new Date(feedback.date).toLocaleDateString()}</p>
                    </div>
                    <p className="mt-2">{feedback.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            
          </Card>

        </TabsContent>
      </Tabs>
    </div>
  )
}
