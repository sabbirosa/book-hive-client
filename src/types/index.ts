export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Borrow {
  _id: string;
  book: Book | string;
  quantity: number;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BorrowSummary {
  _id: string;
  book?: {
    _id: string;
    title: string;
    isbn: string;
    author: string;
    genre: string;
  };
  totalQuantityBorrowed: number;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  description?: string;
  copies?: number;
  available?: boolean;
}

export interface CreateBorrowRequest {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface BooksResponse {
  success: boolean;
  data: Book[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBooks: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface BookResponse {
  success: boolean;
  data: Book;
}

export interface BorrowsResponse {
  success: boolean;
  data: Borrow[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBorrows: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface BorrowSummaryResponse {
  success: boolean;
  data: BorrowSummary[];
  count: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, any>;
} 