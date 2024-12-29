import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Reputation Score Card */}
        <Card>
          <CardHeader>
            <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <Skeleton className="h-40 w-40 rounded-full" />
          </CardContent>
        </Card>

        {/* Threat Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle><Skeleton className="h-6 w-36" /></CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>

      {/* URL Report Table */}
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-24" /></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

