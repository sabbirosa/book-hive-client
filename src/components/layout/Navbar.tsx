import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, Plus } from "lucide-react";
import { Link } from "react-router";
import { ThemeModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookHive</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/books">All Books</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/create-book" className="flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/borrow-summary" className="flex items-center space-x-1">
                <BarChart3 className="h-4 w-4" />
                <span>Borrow Summary</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeModeToggle />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t p-4">
        <div className="flex flex-col space-y-2">
          <Button variant="ghost" asChild>
            <Link to="/books">All Books</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/create-book" className="flex items-center space-x-1">
              <Plus className="h-4 w-4" />
              <span>Add Book</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/borrow-summary" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>Borrow Summary</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
