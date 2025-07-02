import { LoadingSpinner } from "@/components/shared/loading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useGetBorrowStatisticsQuery,
    useGetBorrowSummaryQuery,
} from "@/redux/api/borrowsApi";
import { BarChart3, BookOpen, Clock, TrendingUp } from "lucide-react";

export default function BorrowSummary() {
  const {
    data: summaryData,
    isLoading: isLoadingSummary,
    error: summaryError,
  } = useGetBorrowSummaryQuery();
  const {
    data: statsData,
    isLoading: isLoadingStats,
    error: statsError,
  } = useGetBorrowStatisticsQuery();

  if (isLoadingSummary || isLoadingStats) {
    return (
      <div className="container mx-auto py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (summaryError || statsError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h1>
          <p className="text-muted-foreground mb-4">
            There was an error loading the borrow summary. Please try again
            later.
          </p>
          <p className="text-sm text-muted-foreground">
            Make sure the server is running and accessible.
          </p>
        </div>
      </div>
    );
  }

  const summary = summaryData?.data || [];
  const stats = statsData?.data;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="h-8 w-8" />
          Borrow Summary
        </h1>
        <p className="text-muted-foreground">
          Overview of borrowing activity and book statistics
        </p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Borrows
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBorrows}</div>
              <p className="text-xs text-muted-foreground">
                Total borrowing transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Books Borrowed
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalQuantityBorrowed}
              </div>
              <p className="text-xs text-muted-foreground">
                Total books currently borrowed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue Books
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.overdueCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Books past due date
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Most Popular
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold truncate">
                {stats.mostBorrowedBooks?.[0]?.title || "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.mostBorrowedBooks?.[0]?.totalBorrowed || 0} items
                borrowed
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Books Borrowing Summary</CardTitle>
          <p className="text-sm text-muted-foreground">
            Aggregated data showing total quantities borrowed for each book
          </p>
        </CardHeader>
        <CardContent>
          {summary.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Borrowing Activity
              </h3>
              <p className="text-muted-foreground">
                No books have been borrowed yet. Start by browsing the library.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-right">
                      Total Quantity Borrowed
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        {item.book?.title || "Unknown Title"}
                      </TableCell>
                      <TableCell>
                        {item.book?.author || "Unknown Author"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.book?.genre || "Unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">
                        {item.book?.isbn || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="default" className="font-bold">
                          {item.totalQuantityBorrowed}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {summary.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {summary.length} books with borrowing activity
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
