"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import ThemeContext from "../components/ThemeContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Type() {
  //#region

  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();

  const router = useRouter();

  console.log("Authenticated: ", isAuthenticated);
  console.log("User: ", user);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const [text, setText] = useState("");

  const handleInput = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLDivElement;
    const htmlContent = target.innerHTML; // Get inner HTML content

    // Convert HTML to text with line breaks
    const textWithLineBreaks = htmlContent
      .replace(/<div>/gi, "\n") // Replace starting div tags with line breaks
      .replace(/<\/div>/gi, "") // Remove closing div tags
      .replace(/<br\s*\/?>/gi, "\n"); // Replace <br> tags with line breaks

    setText(textWithLineBreaks);
    if (typeof window !== "undefined") {
      localStorage.setItem("savedText", textWithLineBreaks);
    }
  };

  const saveText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "mendly.txt"; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href); // Optional: free up memory
  };

  const clearText = () => {
    setText(""); // Update state to empty string
    if (typeof window !== "undefined") {
      localStorage.removeItem("savedText"); // Remove the savedText from localStorage
    }

    if (editableRef.current) {
      editableRef.current.innerHTML = ""; // Directly clear the innerHTML of the contentEditable div
      editableRef.current.focus();
    }
  };

  const editableRef = React.useRef<HTMLDivElement>(null);

  const handleContainerClick = () => {
    if (editableRef.current !== null) {
      editableRef.current.focus();
    }
  };

  useEffect(() => {
    if (editableRef.current !== null) {
      // Focus the contentEditable div
      editableRef.current.focus();

      // Set cursor to the end of the content
      const range = document.createRange();
      range.selectNodeContents(editableRef.current);
      range.collapse(false); // false means collapse to the end
      const sel = window.getSelection();
      if (sel) {
        // null check here
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, [theme]);

  const setCursorToEnd = (element: HTMLDivElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection) {
      // Check if selection is not null
      range.selectNodeContents(element);
      range.collapse(false); // false collapses the range to its end
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  useEffect(() => {
    const handleGlobalKeyPress = (event: KeyboardEvent) => {
      const focusableTags = ["INPUT", "TEXTAREA", "BUTTON", "SELECT", "A"];
      if (
        document.activeElement !== editableRef.current &&
        !focusableTags.includes((document.activeElement as HTMLElement).tagName)
      ) {
        if (editableRef.current !== null) {
          // Ensure the ref's current property is not null
          editableRef.current.focus();
          setCursorToEnd(editableRef.current); // Now TypeScript knows this is not null
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyPress);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyPress);
    };
  }, []);

  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  // Update editableRef's content when text changes
  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerHTML = text;
    }
  }, [text]);

  if (isLoading)
    return (
      <div className="flex h-[100svh] w-full items-center justify-center"></div>
    );

  // #endregion

  return isAuthenticated ? (
    <main
      style={{ userSelect: "none", height: "100svh" }}
      className={`flex h-screen w-screen flex-col justify-between ${
        theme === "dark" ? "bg-neutral-950 text-white" : "bg-zinc-50 text-black"
      }`}
    >
      <Navbar theme={theme} loggedIn={true} user={user} />
      {/* Content area */}
      <div className="flex h-screen items-center justify-center">
        <div
          className="relative flex h-32 w-full max-w-lg -translate-y-1/2 transform cursor-text select-none items-end overflow-hidden"
          onClick={handleContainerClick}
        >
          <div
            ref={editableRef}
            className="no-select relative w-full select-none whitespace-pre-wrap text-xl font-normal leading-8 outline-none"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={handleInput}
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>

          {/* Overlay for text lines */}
          <div
            className={`absolute bottom-8 z-10 h-8 w-full ${
              theme === "light" ? "bg-zinc-50" : "bg-neutral-950"
            } opacity-85`}
          ></div>
          <div
            className={`absolute bottom-16 h-8 w-full ${
              theme === "light" ? "bg-zinc-50" : "bg-neutral-950"
            } opacity-90`}
          ></div>
          <div
            className={`absolute bottom-24 h-8 w-full ${
              theme === "light" ? "bg-zinc-50" : "bg-neutral-950"
            } opacity-[0.95]`}
          ></div>
        </div>
      </div>
      <div className="flex fixed bottom-0 w-full items-center justify-between px-4 py-6 font-medium xs:px-8">
        <div className="flex w-full justify-between flex-row gap-8">
          <button
            type="button"
            onClick={saveText}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
              theme === "light"
                ? "text-black hover:bg-zinc-100"
                : "text-white hover:bg-neutral-900"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme === "light" ? "#000" : "#fff"} // Set fill based on theme
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Save
          </button>
          <button
            type="button"
            onClick={clearText}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
              theme === "light"
                ? "text-black hover:bg-zinc-100"
                : "text-white hover:bg-neutral-900"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme === "light" ? "#000" : "#fff"} // Set fill based on theme
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-trash-2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            Clear
          </button>
        </div>
      </div>
    </main>
  ) : (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h2 className="max-w-xs text-center text-2xl font-medium text-white">
        Log in or create an account to get started using Mendly.
      </h2>
      <div className="flex items-center gap-4 pt-8 text-sm font-medium">
        <LoginLink
          className="flex items-center gap-1 rounded-md px-3 py-2 text-sm hover:bg-neutral-900"
          postLoginRedirectURL="/"
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
    </div>
  );
}
