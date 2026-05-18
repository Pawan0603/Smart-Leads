import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Table } from 'lucide-react'

function Skeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />

                <div className="space-y-2">
                    <div className="h-7 w-40 rounded-md bg-muted animate-pulse" />

                    <div className="h-4 w-56 rounded-md bg-muted animate-pulse" />
                </div>
            </div>

            {/* Total Stats Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card
                        key={index}
                        className={cn(
                            'border border-border shadow-sm',
                            index === 0 &&
                            'col-span-2 sm:col-span-1'
                        )}
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

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Leads by Source Skeleton */}
                <Card className="border border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <div className="h-5 w-40 rounded bg-muted animate-pulse" />
                    </CardHeader>

                    <CardContent className="p-6 pt-0 space-y-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="h-5 w-20 rounded-full bg-muted animate-pulse" />

                                    <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                                </div>

                                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-muted-foreground/20 animate-pulse"
                                        style={{
                                            width: `${40 + index * 10}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* User Management Skeleton */}
                {/* <Card className="border border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <div className="h-5 w-40 rounded bg-muted animate-pulse" />
                    </CardHeader>

                    <CardContent className="p-0 overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead>
                                        <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                                    </TableHead>

                                    <TableHead>
                                        <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                                    </TableHead>

                                    <TableHead>
                                        <div className="h-4 w-12 rounded bg-muted animate-pulse" />
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                                        </TableCell>

                                        <TableCell>
                                            <div className="h-3 w-40 max-w-full rounded bg-muted animate-pulse" />
                                        </TableCell>

                                        <TableCell>
                                            <div className="h-6 w-16 rounded-full bg-muted animate-pulse" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card> */}
            </div>
        </div>
    )
}

export default Skeleton