import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, Menu, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ThemeModeToggle } from "../mode-toggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookHive</span>
          </Link>
        </div>

        {/* Center: Menu items (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/books">All Books</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/create-book" className="flex items-center space-x-1">
              <span>Add Book</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/borrow-summary" className="flex items-center space-x-1">
              <span>Borrow Summary</span>
            </Link>
          </Button>
        </div>

        {/* Right: Theme toggle and Mobile menu toggle */}
        <div className="flex items-center space-x-2">
          <ThemeModeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded hover:bg-muted"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
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
              <Link
                to="/borrow-summary"
                className="flex items-center space-x-1"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Borrow Summary</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
