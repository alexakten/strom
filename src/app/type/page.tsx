// pages/type.js
"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../components/Navbar";
import ThemeContext from "../components/ThemeContext";

const Type: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [text, setText] = useState("");
  const editableRef = useRef<HTMLDivElement | null>(null);

  const handleInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    const htmlContent = target.innerHTML;

    const textWithLineBreaks = htmlContent
      .replace(/<div>/gi, "\n")
      .replace(/<\/div>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n");

    setText(textWithLineBreaks);
    if (typeof window !== "undefined") {
      localStorage.setItem("savedText", textWithLineBreaks);
    }
  };

  const handleContainerClick = () => {
    if (editableRef.current !== null) {
      editableRef.current.focus();
    }
  };

  useEffect(() => {
    if (editableRef.current !== null) {
      editableRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(editableRef.current);
      range.collapse(false);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, [theme]);

  const setCursorToEnd = (element: HTMLDivElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection) {
      range.selectNodeContents(element);
      range.collapse(false);
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
          editableRef.current.focus();
          setCursorToEnd(editableRef.current);
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

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerHTML = text;
    }
  }, [text]);

  return (
    <main
      style={{ userSelect: "none" }}
      className={`flex h-[100svh] w-screen flex-col justify-between ${
        theme === "dark"
          ? "bg-dark-background text-light-text"
          : "bg-light-background text-dark-text"
      }`}
    >
      <Navbar />

      <div className="flex h-screen items-center justify-center">
        <div
          className="relative flex h-32 w-full max-w-lg -translate-y-1/2 transform cursor-text select-none items-end overflow-hidden"
          onClick={handleContainerClick}
        >
          <div
            ref={editableRef}
            className={`no-select relative w-full select-none whitespace-pre-wrap text-xl font-normal leading-8 outline-none ${
              theme === "dark" ? "text-dark-text" : "text-light-text"
            }`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={handleInput}
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>

          <div
            className={`absolute bottom-8 z-10 h-8 w-full ${
              theme === "light" ? "bg-light-background" : "bg-dark-background"
            } opacity-85`}
          ></div>
          <div
            className={`absolute bottom-16 h-8 w-full ${
              theme === "light" ? "bg-light-background" : "bg-dark-background"
            } opacity-90`}
          ></div>
          <div
            className={`absolute bottom-24 h-8 w-full ${
              theme === "light" ? "bg-light-background" : "bg-dark-background"
            } opacity-[0.95]`}
          ></div>
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-between px-4 py-6 font-medium xs:px-8"></div>
    </main>
  );
};

export default Type;
