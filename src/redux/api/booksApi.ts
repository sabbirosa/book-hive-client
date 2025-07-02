import type {
    BookResponse,
    BooksResponse,
    CreateBookRequest,
    UpdateBookRequest
} from '@/types';
import { apiSlice } from './apiSlice';

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<BooksResponse, {
      page?: number;
      limit?: number;
      genre?: string;
      available?: boolean;
      author?: string;
      search?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            searchParams.append(key, String(value));
          }
        });
        return `books?${searchParams.toString()}`;
      },
      providesTags: ['Book'],
    }),

    getBookById: builder.query<BookResponse, string>({
      query: (id) => `books/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Book', id }],
    }),

    getAvailableBooks: builder.query<BooksResponse, void>({
      query: () => 'books/available',
      providesTags: ['Book'],
    }),

    getBooksByGenre: builder.query<BooksResponse, string>({
      query: (genre) => `books/genre/${genre}`,
      providesTags: ['Book'],
    }),

    createBook: builder.mutation<BookResponse, CreateBookRequest>({
      query: (bookData) => ({
        url: 'books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Book'],
    }),

    updateBook: builder.mutation<BookResponse, { id: string; bookData: UpdateBookRequest }>({
      query: ({ id, bookData }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: bookData,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Book', id },
        'Book', // Invalidate all book queries to refresh the list
        'Borrow', // Also invalidate borrow queries in case availability changed
      ],
    }),

    deleteBook: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book', 'Borrow'], // Also invalidate borrow records when book is deleted
    }),

    updateBookAvailability: builder.mutation<BookResponse, { id: string; available: boolean }>({
      query: ({ id, available }) => ({
        url: `books/${id}/availability`,
        method: 'PATCH',
        body: { available },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Book', id },
        'Book', // Invalidate all book queries to refresh the list
      ],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useGetAvailableBooksQuery,
  useGetBooksByGenreQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useUpdateBookAvailabilityMutation,
} = booksApi; 