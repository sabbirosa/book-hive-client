import { LoadingSpinner } from "@/components/shared/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { ArrowLeft, BookmarkPlus, Edit } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetBookByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">Book not found</div>
      </div>
    );
  }

  const book = data.data;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Book Details</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Book Cover Placeholder */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg flex items-center justify-center text-6xl font-bold text-blue-600 dark:text-blue-300">
                  {book.title.charAt(0).toUpperCase()}
                </div>
                <div className="mt-4 space-y-2">
                  <Button
                    className="w-full"
                    asChild
                    disabled={!book.available || book.copies === 0}
                  >
                    <Link to={`/borrow/${book._id}`}>
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      Borrow Book
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/edit-book/${book._id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Book
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Information */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl mb-2">
                      {book.title}
                    </CardTitle>
                    <p className="text-xl text-muted-foreground">
                      by {book.author}
                    </p>
                  </div>
                  <Badge variant={book.available ? "default" : "secondary"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Genre
                    </h3>
                    <p className="text-lg">{book.genre}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      ISBN
                    </h3>
                    <p className="text-lg font-mono">{book.isbn}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Available Copies
                    </h3>
                    <p className="text-lg font-semibold">{book.copies}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Status
                    </h3>
                    <p className="text-lg">
                      {book.available && book.copies > 0
                        ? "Available for borrowing"
                        : "Not available"}
                    </p>
                  </div>
                </div>

                {book.description && (
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Description
                    </h3>
                    <p className="text-base leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}

                <div className="text-sm text-muted-foreground border-t pt-4">
                  <p>Book ID: {book._id}</p>
                  {book.createdAt && (
                    <p>
                      Added: {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
