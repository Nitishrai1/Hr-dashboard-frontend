"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Loader2 } from "lucide-react"


const departments = ["Engineering", "Marketing", "HR", "Finance", "Sales", "Product", "Design"]

const generateDepartmentRatings = () => {
  return departments.map((dept) => ({
    department: dept,
    avgRating: (Math.random() * 2 + 3).toFixed(1), 
    employeeCount: Math.floor(Math.random() * 20) + 5, 
  }))
}


const generateBookmarkTrends = () => {
  const data = []
  const currentDate = new Date()

  for (let i = 5; i >= 0; i--) {
    const month = new Date(currentDate)
    month.setMonth(currentDate.getMonth() - i)

    data.push({
      month: month.toLocaleString("default", { month: "short" }),
      bookmarks: Math.floor(Math.random() * 10) + 5,
      promotions: Math.floor(Math.random() * 5) + 1,
    })
  }

  return data
}




export default function AnalyticsPage() {
  const [departmentRatings, setDepartmentRatings] = useState<any[]>([])
  const [bookmarkTrends, setBookmarkTrends] = useState<any[]>([])
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
    const loadData = () => {
      setDepartmentRatings(generateDepartmentRatings())
      setBookmarkTrends(generateBookmarkTrends())
      
      setLoading(false)
    }

 
    const timer = setTimeout(loadData, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">HR Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Employees</CardTitle>
            <CardDescription>Active employees in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">87</div>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Rating</CardTitle>
            <CardDescription>Overall employee performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">3.8</div>
            <p className="text-sm text-muted-foreground">+0.3 from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Promotions</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">14</div>
            <p className="text-sm text-muted-foreground">+5 from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="departments">Department Ratings</TabsTrigger>
          <TabsTrigger value="trends">Bookmark Trends</TabsTrigger>
          
        </TabsList>

        <TabsContent value="departments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Average performance rating by department</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  avgRating: {
                    label: "Avg Rating",
                    color: "hsl(var(--chart-1))",
                  },
                  employeeCount: {
                    label: "Employee Count",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <BarChart data={departmentRatings} margin={{ top: 20, right: 30, left: 20, bottom: 185 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={70} tickMargin={20} />
                  <YAxis yAxisId="left" orientation="left" stroke="var(--color-avgRating)" />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--color-employeeCount)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="avgRating" fill="var(--color-avgRating)" yAxisId="left" radius={4} />
                  <Bar dataKey="employeeCount" fill="var(--color-employeeCount)" yAxisId="right" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bookmark & Promotion Trends</CardTitle>
              <CardDescription>Last 6 months of employee bookmarks and promotions</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  bookmarks: {
                    label: "Bookmarks",
                    color: "hsl(var(--chart-1))",
                  },
                  promotions: {
                    label: "Promotions",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <LineChart data={bookmarkTrends} margin={{ top: 20, right: 30, left: 20, bottom: 195 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="bookmarks"
                    stroke="var(--color-bookmarks)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="promotions"
                    stroke="var(--color-promotions)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

       
      </Tabs>
    </div>
  )
}
