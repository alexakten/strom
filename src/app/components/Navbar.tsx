import Link from "next/link";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface NavbarProps {
  onThemeToggle?: () => void; // Optional property
  theme?: string; // Optional property
  loggedIn: boolean
}

const Navbar: React.FC<NavbarProps> = ({
  onThemeToggle,
  theme = "light", // Default to "light" if not provided
  loggedIn,
}) => {
  return (
    <nav className="fixed top-0 flex w-full items-center justify-between px-4 py-6 xs:px-8">
      <Link href={"/"}>
        <h2 className="text-xl font-medium tracking-tight">mendly</h2>
      </Link>

      {loggedIn && ( // Only render if showThemeSwitcher is true and onThemeToggle is defined
        <button
          className="text-sm px-3 py-2 font-medium"
          type="button"
          onClick={onThemeToggle}
        >
          {theme === "light" ? "◖ dark" : "● light"}
        </button>
      )}

      {!loggedIn && (
        <div className="flex items-center gap-4 text-sm font-medium">
          <LoginLink
            className="rounded-md flex gap-1 items-center px-3 py-2 text-sm hover:bg-neutral-900"
            postLoginRedirectURL="/type"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Log in
          </LoginLink>

          <RegisterLink className="rounded-md px-3 py-2 text-sm hover:bg-neutral-900">
            Sign up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
