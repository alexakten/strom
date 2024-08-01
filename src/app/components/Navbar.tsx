// app/components/Navbar.tsx
import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-6 xs:px-8 ${
        theme === "dark" ? " bg-dark-background text-light-text" : "bg-light-background text-dark-text"
      }`}
    >
      <Link href="/">
        <h2 className="text-lg font-medium tracking-tight">strōm</h2>
      </Link>
      <div>
        <button
          className={`flex w-full items-center gap-2 rounded-md px-3 py-3 text-sm ${
            theme === "dark"
              ? "text-light-text hover:bg-zinc-900"
              : "text-dark-text hover:bg-[#EFE6DD]"
          }`}
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-sun"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              {/* Light mode */}
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79" />
              </svg>
              {/* Dark mode */}
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
