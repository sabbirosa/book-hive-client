import { ThemeModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div>BookHive</div>
      <ThemeModeToggle />
    </nav>
  );
}
