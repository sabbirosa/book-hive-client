export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 bg-gray-800 text-white">
      <div className="text-sm">
        &copy; {new Date().getFullYear()} BookHive. All rights reserved.
      </div>
    </footer>
  );
}
