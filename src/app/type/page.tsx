"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";

import ThemeContext from "../components/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [viewportHeight, setViewportHeight] = useState(0);

  const [text, setText] = useState("");

  const handleInput = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLDivElement;
    const currentText = target.textContent || "";
    setText(currentText);
    if (typeof window !== "undefined") {
      localStorage.setItem("savedText", currentText);
    }
  };

  const saveText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "strōm-savedText.txt"; // Name of the downloaded file
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
    if (typeof window !== "undefined") {
      const savedText = localStorage.getItem("savedText");
      if (savedText) {
        setText(savedText);
      }

      const setVH = () => {
        setViewportHeight(window.innerHeight);
      };
      setVH();
      window.addEventListener("resize", setVH);
      return () => window.removeEventListener("resize", setVH);
    }
  }, []);

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

  // #endregion

  return (
    <main
      style={{ userSelect: "none", height: `${viewportHeight}px` }}
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
