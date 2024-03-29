"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";

import ThemeContext from "../components/ThemeContext";

export default function Type() {
  
//#region 

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

  // #endregion

  return (
    <main
      style={{ userSelect: "none", height: "100svh" }}
      className={`flex flex-col justify-between w-screen h-screen px-4 xs:px-12 py-8 ${
        theme === "light"
          ? "bg-zinc-50 text-black"
          : "bg-neutral-950 text-white"
      }`}
    >
      {/* ——————————————————————————————————————————————————————————————————— */}
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      {/* ——————————————————————————————————————————————————————————————————— */}

      <div className="flex items-center justify-center h-screen">
        <div
          className="w-full flex items-end h-32 overflow-hidden select-none cursor-text max-w-lg relative transform -translate-y-1/2"
          onClick={handleContainerClick}
        >
          <div
            ref={editableRef}
            className="whitespace-pre-wrap w-full outline-none font-normal select-none leading-8 text-xl relative no-select"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={handleInput}  
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>

          {/* Overlay for 2nd line */}
          <div
            className={`absolute z-10 bottom-8 w-full h-8 ${
              theme === "light" ? "bg-zinc-50" : "bg-neutral-950"
            } opacity-85`}
          ></div>
          {/* Overlay for 3rd line */}
          <div
            className={`absolute bottom-16 w-full h-8 ${
              theme === "light" ? "bg-zinc-50" : "bg-neutral-950"
            } opacity-90`}
          ></div>
          {/* Overlay for 4th line */}
          <div
            className={`absolute bottom-24 w-full h-8 ${
              theme === "light" ? "bg-zinc-50" : "bg-neutral-950"
            } opacity-95`}
          ></div>
        </div>
      </div>

      {/* ——————————————————————————————————————————————————————————————————— */}

      <div className="flex w-full font-medium justify-between items-center">
        <div className="flex flex-row gap-8">
          <button type="button" onClick={saveText}>
            ( save )
          </button>
          <button type="button" onClick={clearText}>
            clear
          </button>
        </div>
        {/* <div style={{ display: "none" }}></div> */}

        <a
          href="mailto:alex.akten@outlook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="">feedback</p>
        </a>
      </div>
    </main>
  );
}
