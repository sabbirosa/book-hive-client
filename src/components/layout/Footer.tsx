export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BookHive | All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="mr-2">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </span>
            <span className="mx-2">|</span>
            <span className="mr-2">
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>
            </span>
            <span className="mx-2">|</span>
            <span className="ml-2">
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
