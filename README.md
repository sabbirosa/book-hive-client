# BookHive Client

A modern library management system frontend that provides an intuitive interface for managing books and borrowing transactions.

## 🚀 Features

- **Book Management**: Browse, search, and view detailed information about books
- **Library Catalog**: Comprehensive book listing with pagination and filtering
- **Borrowing System**: Easy book borrowing with due date management
- **Borrow Tracking**: View borrowing history and summary
- **CRUD Operations**: Create, edit, and delete book records
- **Responsive Design**: Mobile-first design with modern UI components
- **Dark/Light Theme**: Toggle between dark and light modes
- **Real-time Updates**: State management with Redux Toolkit

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **Date Management**: date-fns with React Day Picker
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Theme**: next-themes for dark/light mode

## 📋 Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher (comes with Node.js)

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sabbirosa/book-hive-client.git
   cd book-hive-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📜 Available Scripts

| Script            | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Starts the development server with hot reload |
| `npm run build`   | Builds the app for production                 |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run ESLint to check code quality              |

## 🎯 Key Features

### Book Management

- **Browse Books**: View all available books with pagination
- **Search & Filter**: Search by title, author, or filter by genre
- **Book Details**: Detailed view with description, availability status
- **Add/Edit Books**: Admin functionality to manage book catalog

### Borrowing System

- **Borrow Books**: Select books and set return dates
- **Availability Check**: Real-time availability status
- **Borrow History**: Track all borrowing transactions
- **Summary Reports**: Overview of borrowing patterns

### User Interface

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Clean, intuitive interface using shadcn/ui
- **Theme Support**: Dark and light mode toggle
- **Loading States**: Smooth loading indicators
- **Error Handling**: Comprehensive error boundaries and feedback

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### API Integration

The client communicates with the BookHive Server API. Ensure the server is running and accessible at the configured base URL.

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on top of Radix UI:

- **Forms**: Input, Select, Textarea, Date Picker
- **Navigation**: Dropdown Menu, Dialog
- **Feedback**: Badge, Toast notifications
- **Layout**: Card, Table, Button
- **Data Display**: Calendar, Popover

## 🚀 Building for Production

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.
