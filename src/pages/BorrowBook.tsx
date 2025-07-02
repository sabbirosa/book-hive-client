import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { useCreateBorrowMutation } from "@/redux/api/borrowsApi";
import type { CreateBorrowRequest } from "@/types";
import { ArrowLeft, BookmarkPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function BorrowBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  
  const { data: bookData, isLoading: isLoadingBook, error: bookError } = useGetBookByIdQuery(bookId!);
  const [createBorrow, { isLoading: isBorrowing }] = useCreateBorrowMutation();

  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: "",
  });

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.quantity || !formData.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate quantity range
    if (formData.quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    // Validate against available copies
    if (bookData?.data) {
      const book = bookData.data;
      
      if (!book.available) {
        toast.error("This book is currently not available for borrowing");
        return;
      }

      if (book.copies < 1) {
        toast.error("No copies available for borrowing");
        return;
      }

      if (formData.quantity > book.copies) {
        toast.error(`Only ${book.copies} copies available. Please reduce the quantity.`);
        return;
      }
    }

    // Validate due date
    const selectedDate = new Date(formData.dueDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (selectedDate <= new Date()) {
      toast.error("Due date must be in the future");
      return;
    }

    const borrowRequest: CreateBorrowRequest = {
      book: bookId!,
      quantity: formData.quantity,
      dueDate: formData.dueDate,
    };

    try {
      await createBorrow(borrowRequest).unwrap();
      toast.success("Book borrowed successfully! Redirecting to summary...");
      navigate("/borrow-summary");
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Failed to borrow book";
      toast.error(message);
      console.error("Borrow error:", error);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Real-time validation for quantity
      if (field === "quantity" && bookData?.data) {
        const quantity = Number(value);
        if (quantity > bookData.data.copies) {
          toast.error(`Only ${bookData.data.copies} copies available`);
        }
      }
      
      return updated;
    });
  };

  if (isLoadingBook) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading book...</div>
      </div>
    );
  }

  if (bookError || !bookData?.data) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">Book not found</div>
      </div>
    );
  }

  const book = bookData.data;

  if (!book.available || book.copies === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Available</h1>
          <p className="text-muted-foreground mb-4">
            Sorry, "{book.title}" is currently not available for borrowing.
          </p>
          <Button onClick={() => navigate("/books")}>
            Browse Other Books
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Borrow Book</h1>
        </div>

        {/* Book Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Book Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-muted-foreground">by {book.author}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Genre:</span>
                  <span>{book.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span>ISBN:</span>
                  <span className="font-mono">{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Copies:</span>
                  <Badge variant="default">{book.copies}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Borrow Form */}
        <Card>
          <CardHeader>
            <CardTitle>Borrow Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={book.copies}
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 1)}
                    placeholder="Number of copies to borrow"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum {book.copies} copies available
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    min={minDate}
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Select when you plan to return the book
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Borrowing Terms:</h4>
                <ul className="text-sm space-y-1">
                  <li>• You are responsible for the book(s) until returned</li>
                  <li>• Late returns may incur fees</li>
                  <li>• Please return books in good condition</li>
                  <li>• Contact the library if you need to extend your borrowing period</li>
                </ul>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isBorrowing || !book.available || book.copies < 1 || formData.quantity > book.copies}
                >
                  {isBorrowing ? (
                    "Processing..."
                  ) : (
                    <>
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      Confirm Borrow
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 