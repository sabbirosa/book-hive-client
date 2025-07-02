import type {
    Borrow,
    BorrowsResponse,
    BorrowSummaryResponse,
    CreateBorrowRequest
} from '@/types';
import { apiSlice } from './apiSlice';

export const borrowsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBorrows: builder.query<BorrowsResponse, {
      page?: number;
      limit?: number;
      book?: string;
      overdue?: boolean;
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
        return `borrows?${searchParams.toString()}`;
      },
      providesTags: ['Borrow'],
    }),

    createBorrow: builder.mutation<{ success: boolean; message: string; data: Borrow }, CreateBorrowRequest>({
      query: (borrowData) => ({
        url: 'borrows',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow', 'Book'],
    }),

    getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
      query: () => 'borrows/summary',
      providesTags: ['Borrow'],
    }),

    getOverdueBooks: builder.query<BorrowsResponse, void>({
      query: () => 'borrows/overdue',
      providesTags: ['Borrow'],
    }),

    getTotalBorrowedForBook: builder.query<{ success: boolean; data: { totalBorrowed: number } }, string>({
      query: (bookId) => `borrows/book/${bookId}/total`,
      providesTags: (_result, _error, bookId) => [{ type: 'Borrow', id: bookId }],
    }),

    getBorrowStatistics: builder.query<{
      success: boolean;
      data: {
        totalBorrows: number;
        totalQuantityBorrowed: number;
        overdueCount: number;
        mostBorrowedBook: any;
      };
    }, void>({
      query: () => 'borrows/statistics',
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useGetAllBorrowsQuery,
  useCreateBorrowMutation,
  useGetBorrowSummaryQuery,
  useGetOverdueBooksQuery,
  useGetTotalBorrowedForBookQuery,
  useGetBorrowStatisticsQuery,
} = borrowsApi; 