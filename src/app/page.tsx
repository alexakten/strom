// app/page.tsx
"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import React, { useState, useRef, useEffect, useContext } from "react";
import ThemeContext from "./components/ThemeContext";
import { Motion } from "./components/Motion";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const [text, setText] = useState(
    "It was a bright cold day in April, and the clocks were striking thirteen. ",
  );
  const editableRef = useRef<HTMLDivElement | null>(null);

  const handleInput = (e: any) => {
    setText(e.target.innerHTML);
    setTimeout(() => {
      setCursorToEnd(editableRef.current);
    }, 0);
  };

  const setCursorToEnd = (element: HTMLDivElement | null) => {
    if (element) {
      const range = document.createRange();
      const selection = window.getSelection();
      if (selection) {
        range.selectNodeContents(element);
        range.collapse(false); // false collapses the range to its end
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editableRef.current &&
        !editableRef.current.contains(event.target as Node)
      ) {
        editableRef.current.focus();
        setCursorToEnd(editableRef.current);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (editableRef.current !== null) {
      editableRef.current.focus();
      setCursorToEnd(editableRef.current);
    }
  }, []);

  useEffect(() => {
    if (editableRef.current) {
      preventAutomaticScrollUpOnNewLine(editableRef.current);
    }
  }, []);

  const preventAutomaticScrollUpOnNewLine = (
    bottomChildDiv: HTMLDivElement,
  ) => {
    let scrollY: number;
    bottomChildDiv.addEventListener("keydown", () => {
      scrollY = window.scrollY;
    });
    bottomChildDiv.addEventListener("input", () => {
      if (scrollY !== window.scrollY) {
        window.scrollTo({ top: scrollY });
      }
    });
  };

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerHTML = text;
      setCursorToEnd(editableRef.current);
    }
  }, [text]);

  return (
    <Motion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <main
        className={`mb-12 mt-48 flex flex-col justify-between ${
          theme === "dark"
            ? "bg-dark-background text-light-text"
            : "bg-light-background text-dark-text"
        }`}
      >
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 text-left xs:px-8">
          <div className="flex w-full max-w-4xl flex-col items-start">
            <h1 className="text-[clamp(42px,8vw,120px)] font-medium leading-[0.95] tracking-[-1px]">
              Write with zero
              <br /> distractions.
            </h1>
            <Link className="mt-8" href={"/type"}>
              <button
                className={`flex items-center gap-3 rounded-2xl px-6 py-4 text-lg font-medium ${
                  theme === "dark"
                    ? "bg-light-background text-dark-background hover:bg-[#EFE6DD]"
                    : "bg-dark-background text-light-text hover:bg-zinc-900"
                }`}
              >
                <p>Start writing for free</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-edit-3"
                >
                  <link
                    type="text/css"
                    rel="stylesheet"
                    id="dark-mode-custom-link"
                  />
                  <link
                    type="text/css"
                    rel="stylesheet"
                    id="dark-mode-general-link"
                  />
                  <style
                    lang="en"
                    type="text/css"
                    id="dark-mode-custom-style"
                  />
                  <style
                    lang="en"
                    type="text/css"
                    id="dark-mode-native-style"
                  />
                  <style
                    lang="en"
                    type="text/css"
                    id="dark-mode-native-sheet"
                  />
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
            </Link>
          </div>

          <div
            className={`relative mt-16 flex h-[28rem] w-full max-w-5xl justify-center rounded-[2rem] ${
              theme === "dark" ? "bg-light-background" : "bg-dark-background"
            }`}
          >
            <div className="absolute bottom-48 mt-16 flex h-32 w-full max-w-lg justify-center overflow-hidden px-6">
              <div className="flex h-full w-full cursor-text select-none items-end overflow-hidden">
                <div
                  ref={editableRef}
                  className={`no-select relative w-full select-none whitespace-pre-wrap text-xl font-normal leading-8 outline-none ${
                    theme === "dark"
                      ? "text-dark-background"
                      : "text-light-text"
                  }`}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={handleInput}
                  spellCheck={false}
              
                ></div>
                {/* Overlay for text lines */}
                <div
                  className={`absolute bottom-8 z-10 h-8 w-full ${
                    theme === "dark"
                      ? "bg-light-background"
                      : "bg-dark-background"
                  } opacity-85`}
                ></div>
                <div
                  className={`absolute bottom-16 z-10 h-8 w-full ${
                    theme === "dark"
                      ? "bg-light-background"
                      : "bg-dark-background"
                  } opacity-90`}
                ></div>
                <div
                  className={`absolute bottom-24 z-10 h-8 w-full ${
                    theme === "dark"
                      ? "bg-light-background"
                      : "bg-dark-background"
                  } opacity-[0.95]`}
                ></div>
              </div>
            </div>
          </div>

          {/* <div className="mt-8 flex flex-row items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather opacity-40 feather-corner-left-up"
            >
              <link
                type="text/css"
                rel="stylesheet"
                id="dark-mode-custom-link"
              />
              <link
                type="text/css"
                rel="stylesheet"
                id="dark-mode-general-link"
              />
              <style lang="en" type="text/css" id="dark-mode-custom-style" />
              <style lang="en" type="text/css" id="dark-mode-native-style" />
              <style lang="en" type="text/css" id="dark-mode-native-sheet" />
              <polyline points="14 9 9 4 4 9" />
              <path d="M20 20h-7a4 4 0 0 1-4-4V4" />
            </svg>
            <p className="text-sm font-medium opacity-40">
              Psst... you can edit the text above
            </p>
          </div> */}

          <div className="mt-24 grid max-w-4xl gap-16 xs:grid-cols-2 lg:grid-cols-4">
            <div className="flex w-full flex-col items-start gap-2 text-left">
              <p className="text-2xl font-medium">No distractions</p>
              <p className="text-lg font-normal leading-tight opacity-40">
                One font, one color, one feature—writing.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 text-left">
              <p className="text-2xl font-medium">Minimal editing</p>
              <p className="text-lg font-normal leading-tight opacity-40">
                You can only edit your last line.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 text-left">
              <p className="text-2xl font-medium">Dark mode</p>
              <p className="text-lg font-normal leading-tight opacity-40">
                Switch between light or dark mode.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 text-left">
              <p className="text-2xl font-medium">Fully private</p>
              <p className="text-lg font-normal leading-tight opacity-40">
                Everything is only saved locally.
              </p>
            </div>
          </div>

          <p className="mt-32 text-sm font-medium opacity-40">
            🧑🏽‍💻 Built by{" "}
            <span className="underline">
              <a
                href="https://www.alexakten.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alex
              </a>
            </span>
          </p>
        </div>
      </main>
    </Motion>
  );
}
