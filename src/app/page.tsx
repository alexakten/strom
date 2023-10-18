"use client";
import "./globals.css";
import React from "react";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("light"); // Default theme is dark
  const [viewportHeight, setViewportHeight] = useState(0);

  const [text, setText] = useState("");
  const handleInput = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLDivElement; // Adjust as per your actual element type
    const currentText = target.textContent || "";
    setText(currentText);
    localStorage.setItem("savedText", currentText);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
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
    localStorage.removeItem("savedText"); // Remove the savedText from localStorage

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
  }, []);

  useEffect(() => {
    if (editableRef.current !== null) {
      editableRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = () => {
      if (
        editableRef.current &&
        document.activeElement !== editableRef.current
      ) {
        editableRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main
      style={{ userSelect: "none", height: `${viewportHeight}px` }}
      className={`flex flex-col justify-between w-screen h-screen overflow-hidden overflow-y-hidden px-12 xs:px-20 py-10 ${
        theme === "light"
          ? "bg-slate-100 text-black"
          : "bg-neutral-950 text-white"
      }`}
    >
      <nav className="flex justify-between relative">
        <h1 className="text-4xl tracking-normal font-medium">strōm</h1>
        <div className="font-medium">
          <button type="button" onClick={toggleTheme}>
            {theme === "light" ? "[ ◖ dark ]" : "[ ● light ]"}
          </button>
        </div>
      </nav>

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
            // onMouseUp={(e) => e.preventDefault()}
            // onMouseDown={(e) => e.preventDefault()}
            onBlur={handleInput}
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>

          {/* Overlay for 2nd line */}
          <div
            className={`absolute z-10 bottom-8 w-full h-8 ${
              theme === "light" ? "bg-slate-100" : "bg-neutral-950"
            } opacity-85`}
          ></div>
          {/* Overlay for 3rd line */}
          <div
            className={`absolute bottom-16 w-full h-8 ${
              theme === "light" ? "bg-slate-100" : "bg-neutral-950"
            } opacity-90`}
          ></div>
          {/* Overlay for 4th line */}
          <div
            className={`absolute bottom-24 w-full h-8 ${
              theme === "light" ? "bg-slate-100" : "bg-neutral-950"
            } opacity-95`}
          ></div>
        </div>
      </div>

      <div className="flex font-neue-haas font-medium justify-between items-end">
        <div className="flex flex-row gap-4">
          <button type="button" onClick={saveText}>
            [ save ]
          </button>
          <button type="button" onClick={clearText}>
            [ clear ]
          </button>
        </div>

        <p>© 2023</p>
      </div>
    </main>
  );
}
