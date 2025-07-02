
export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 BookHive. Built with React, TypeScript, and RTK Query.
          </div>
          <div className="text-sm text-muted-foreground">
            A minimal library management system
          </div>
        </div>
      </div>
    </footer>
  );
}
