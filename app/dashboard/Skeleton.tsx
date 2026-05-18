import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

function Skeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Dashboard
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Welcome back — here's your leads overview.
                </p>
            </div>

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Card
                        key={index}
                        className="border border-border shadow-sm"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="h-3 w-20 rounded bg-muted animate-pulse" />

                                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                            </div>

                            <div className="h-8 w-16 rounded bg-muted animate-pulse" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Bottom Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Leads by Source Skeleton */}
                <Card className="border border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <div className="h-5 w-40 rounded bg-muted animate-pulse" />
                    </CardHeader>

                    <CardContent className="p-6 pt-0 space-y-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <div className="h-4 w-24 rounded bg-muted animate-pulse" />

                                    <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                                </div>

                                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full bg-muted-foreground/20 rounded-full animate-pulse"
                                        style={{
                                            width: `${40 + index * 10}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Recent Leads Skeleton */}
                <Card className="border border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <div className="h-5 w-32 rounded bg-muted animate-pulse" />
                    </CardHeader>

                    <CardContent className="p-6 pt-0 space-y-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-2"
                            >
                                <div className="min-w-0 flex-1 space-y-2">
                                    <div className="h-4 w-32 rounded bg-muted animate-pulse" />

                                    <div className="h-3 w-48 max-w-full rounded bg-muted animate-pulse" />
                                </div>

                                <div className="h-6 w-20 rounded-full bg-muted animate-pulse shrink-0" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Skeleton