"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import ThemeContext from "../components/ThemeContext";

interface ProfileProps {
  user: any; // User data for initials
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getUserInitials = (user: any) => {
    const givenNameInitial = user?.given_name?.[0]?.toUpperCase();
    const familyNameInitial = user?.family_name?.[0]?.toUpperCase();
    return `${givenNameInitial || ""}${familyNameInitial || ""}`;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`h-10 w-10 rounded-full text-xs ${theme === "light"
            ? "bg-zinc-200 text-black"
            : "bg-neutral-900 text-white"
          }`}
        onClick={toggleDropdown}
      >
        {getUserInitials(user)}
      </button>

      {isDropdownOpen && (
        <div
          className={`absolute right-0 top-12 w-56 rounded-lg p-4 ${theme === "light"
              ? "bg-zinc-200 text-black"
              : "bg-neutral-900 text-white"
            }`}
        >
          <div>
            <p className="text-sm font-medium">
              {user?.given_name || "User"} {user?.family_name || ""}
            </p>
            <p className="text-sm opacity-50">{user?.email || ""}</p>
          </div>
          <div className="flex flex-col pt-4 text-sm">
            <button
              className={`flex w-full items-center gap-2 rounded-md px-4 py-2 ${theme === "light"
                  ? "hover:bg-zinc-300 text-black"
                  : "hover:bg-neutral-800 text-white"
                }`}
              onClick={toggleTheme} // Trigger theme change
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
                  Light mode
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
                  Dark mode
                </>
              )}
            </button>
            <LogoutLink className={`flex w-full items-center gap-2 rounded-md px-4 py-2 text-red-600 ${theme === "light"
                ? "hover:bg-zinc-300"
                : "hover:bg-neutral-800"
              }`}>
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
                <path d="M15 3h4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Log out
            </LogoutLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
