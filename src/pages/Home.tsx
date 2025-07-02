import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookOpen, Library, Plus } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
          <Library className="h-8 w-8" />
          Welcome to BookHive
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your minimal library management system. Manage books, track borrowings, and keep your library organized.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6" />
              Browse Books
            </CardTitle>
            <CardDescription>
              View all available books in your library
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="w-full">
              <Link to="/books">View All Books</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Plus className="h-6 w-6" />
              Add New Book
            </CardTitle>
            <CardDescription>
              Add a new book to your library collection
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="w-full">
              <Link to="/create-book">Add Book</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Borrow Summary
            </CardTitle>
            <CardDescription>
              View borrowing statistics and summaries
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="w-full">
              <Link to="/borrow-summary">View Summary</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground">
          Start by browsing your book collection or adding new books to get started.
        </p>
      </div>
    </div>
  );
}
