import { LoadingSpinner } from "@/components/shared/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { useCreateBorrowMutation } from "@/redux/api/borrowsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookmarkPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const borrowBookSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1").int("Quantity must be a whole number"),
  dueDate: z.date({
    required_error: "Due date is required",
    invalid_type_error: "Please select a valid date",
  }).refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
});

type BorrowBookForm = z.infer<typeof borrowBookSchema>;

export default function BorrowBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const {
    data: bookData,
    isLoading: isLoadingBook,
    error: bookError,
  } = useGetBookByIdQuery(bookId!);
  const [createBorrow, { isLoading: isBorrowing }] = useCreateBorrowMutation();

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const form = useForm<BorrowBookForm>({
    resolver: zodResolver(borrowBookSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = async (data: BorrowBookForm) => {
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

      if (data.quantity > book.copies) {
        toast.error(
          `Only ${book.copies} copies available. Please reduce the quantity.`
        );
        return;
      }
    }

    const borrowRequest = {
      book: bookId!,
      quantity: data.quantity,
      dueDate: data.dueDate.toISOString().split("T")[0], // Convert Date to string format
    };

    try {
      await createBorrow(borrowRequest).unwrap();
      toast.success("Book borrowed successfully! Redirecting to summary...");
      navigate("/borrow-summary");
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || "Failed to borrow book";
      toast.error(message);
      console.error("Borrow error:", error);
    }
  };

  if (isLoadingBook) {
    return (
      <div className="container mx-auto py-8">
        <LoadingSpinner />
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
          <Button onClick={() => navigate("/books")}>Browse Other Books</Button>
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max={book.copies}
                            placeholder="Number of copies to borrow"
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              field.onChange(value);
                              
                              // Real-time validation for quantity
                              if (value > book.copies) {
                                toast.error(`Only ${book.copies} copies available`);
                              }
                            }}
                          />
                        </FormControl>
                        <p className="text-sm text-muted-foreground">
                          Maximum {book.copies} copies available
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date *</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            onDateChange={(date) => field.onChange(date)}
                            placeholder="Select due date"
                            minDate={tomorrow}
                          />
                        </FormControl>
                        <p className="text-sm text-muted-foreground">
                          Select when you plan to return the book
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Borrowing Terms:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• You are responsible for the book(s) until returned</li>
                    <li>• Late returns may incur fees</li>
                    <li>• Please return books in good condition</li>
                    <li>
                      • Contact the library if you need to extend your borrowing
                      period
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      isBorrowing ||
                      !book.available ||
                      book.copies < 1 ||
                      (form.watch("quantity") || 0) > book.copies
                    }
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
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
