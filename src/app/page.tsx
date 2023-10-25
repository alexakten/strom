"use client";
import "./globals.css";
import React from "react";
import Image from "next/image";
import Head from "next/head";

import Quotes from "../../public/quotes";

import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [viewportHeight, setViewportHeight] = useState(0);
  const [view, setView] = useState("text"); // default to text view

  const [text, setText] = useState("");

  const [selectedDuration, setSelectedDuration] = useState(5);
  const [isMeditating, setIsMeditating] = useState(false);
  function toggleMeditation() {
    setIsMeditating(!isMeditating);
  }

  const [selectedSpeed, setSelectedSpeed] = useState("relax");
  const [isBreathing, setIsBreathing] = useState(false);
  const toggleBreathing = () => {
    setIsBreathing((prev) => !prev);
  };

  const getRandomQuoteValue = () => {
    const randomIndex = Math.floor(Math.random() * Quotes.length);
    return Quotes[randomIndex];
  };

  const getRandomQuote = () => {
    setCurrentQuote(getRandomQuoteValue());
  };

  const [currentQuote, setCurrentQuote] = useState(getRandomQuoteValue());

  const handleInput = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLDivElement;
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

  type Todo = {
    text: string;
    isChecked: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>(() => {
    // Try getting todos from localStorage on initial load
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [{ text: "", isChecked: false }];
  });

  const [activeTodoIndex, setActiveTodoIndex] = useState<number | null>(null);

  useEffect(() => {
    // Any time the todos change, update them in localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string): void => {
    setTodos((prevTodos: Todo[]) => [...prevTodos, { text, isChecked: false }]);
  };

  const toggleTodo = (index: number): void => {
    const newTodos = [...todos];
    newTodos[index].isChecked = !newTodos[index].isChecked;
    setTodos(newTodos);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.currentTarget.innerText;
      if (value.trim() !== "") {
        const newTodos = [...todos];
        newTodos[newTodos.length - 1].text = value.trim();
        setTodos(newTodos);
        addTodo("");
        // Immediately focus on the new todo
        if (editableRef.current) {
          editableRef.current.innerHTML = "";
          editableRef.current.focus();
        }
      }
    }
  };

  const handleDocumentKeyPress = useCallback(
    (event: Event) => {
      const keyEvent = event as KeyboardEvent;
      // Check if the target isn't any contentEditable div
      if (
        todos[todos.length - 1].text === "" &&
        editableRef.current &&
        !(keyEvent.target as HTMLElement).contentEditable
      ) {
        editableRef.current.focus();
      }
    },
    [todos]
  );

  const clearTodos = (): void => {
    setTodos([{ text: "", isChecked: false }]);
  };

  const markAllDone = (): void => {
    const updatedTodos = todos.map((todo) => ({ ...todo, isChecked: true }));
    setTodos(updatedTodos);
  };

  useEffect(() => {
    document.addEventListener("keypress", handleDocumentKeyPress);
    return () => {
      document.removeEventListener("keypress", handleDocumentKeyPress);
    };
  }, [todos, handleDocumentKeyPress]);

  useEffect(() => {
    if (editableRef && editableRef.current) {
      editableRef.current.focus();
    }
  }, [todos.length]);

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
  }, [theme, view]);

  useEffect(() => {
    const handleKeyDown = () => {
      if (
        editableRef.current &&
        document.activeElement !== editableRef.current
      ) {
        editableRef.current.focus();

        // Set cursor to the end
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
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [gratitudeEntries, setGratitudeEntries] = useState<
    Array<{ text: string }>
  >([{ text: "" }]);
  const [activeEntryIndex, setActiveEntryIndex] = useState<number | null>(null);

  const handleGratitudeKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the addition of a new line
      const newEntries = [...gratitudeEntries];
      newEntries.splice(activeEntryIndex! + 1, 0, { text: "" });
      setGratitudeEntries(newEntries);
      setActiveEntryIndex(activeEntryIndex! + 1);
      // Set a small delay to ensure focus is set on the next editable div
      setTimeout(() => {
        editableRef.current?.focus();
      }, 50);
    }
  };

  useEffect(() => {
    // Check local storage and update gratitudeEntries with saved data if present
    const savedEntries = localStorage.getItem("gratitudeEntries");
    if (savedEntries) {
      setGratitudeEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gratitudeEntries", JSON.stringify(gratitudeEntries));
  }, [gratitudeEntries]);

  const clearGratitude = () => {
    setGratitudeEntries([{ text: "" }]);
    localStorage.removeItem("gratitudeEntries");
  };

  return (
    <main
      style={{ userSelect: "none", height: `${viewportHeight}px` }}
      className={`flex flex-col justify-between w-screen h-screen overflow-hidden overflow-y-hidden px-4 xs:px-12 py-10 ${
        theme === "light"
          ? "bg-zinc-50 text-black"
          : "bg-neutral-950 text-white"
      }`}
    >
      <Head>
        <link rel="preload" href="/icons/text.png" as="image" />
        <link rel="preload" href="/icons/text-white.png" as="image" />
        <link rel="preload" href="/icons/breathe.png" as="image" />
        <link rel="preload" href="/icons/breathe-white.png" as="image" />
        <link rel="preload" href="/icons/meditate.png" as="image" />
        <link rel="preload" href="/icons/meditate-white.png" as="image" />
        <link rel="preload" href="/icons/todo.png" as="image" />
        <link rel="preload" href="/icons/todo-white.png" as="image" />
        <link rel="preload" href="/icons/quotes.png" as="image" />
        <link rel="preload" href="/icons/quotes-white.png" as="image" />
        {/* ... other head elements ... */}
      </Head>
      {/* ——————————————————————————————————————————————————————————————————— */}

      <nav className="flex justify-between items-center relative">
        <h1 className="text-4xl tracking-normal font-medium">strōm</h1>
        <div className="font-medium">
          <button type="button" onClick={toggleTheme}>
            {theme === "light" ? "◖ dark" : "● light"}
          </button>
        </div>
        <div className="flex flex-row gap-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            type="button"
            aria-label="Text"
            onClick={() => setView("text")}
            className={`p-4 border-sm border-2 rounded-md ${
              theme === "dark" ? "border-white" : "border-black"
            } relative ${
              view === "text"
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={
                  theme === "dark"
                    ? view === "text"
                      ? "/icons/text.png"
                      : "/icons/text-white.png"
                    : view === "text"
                    ? "/icons/text-white.png"
                    : "/icons/text.png"
                }
                alt="Text Icon"
                width={20}
                height={20}
              />
            </div>
          </button>

          <button
            type="button"
            aria-label="Breathe"
            onClick={() => setView("breathe")}
            className={`p-4 border-sm border-2 rounded-md ${
              theme === "dark" ? "border-white" : "border-black"
            } relative ${
              view === "breathe"
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={
                  theme === "dark"
                    ? view === "breathe"
                      ? "/icons/breathe.png"
                      : "/icons/breathe-white.png"
                    : view === "breathe"
                    ? "/icons/breathe-white.png"
                    : "/icons/breathe.png"
                }
                alt="Breathe Icon"
                width={20}
                height={20}
              />
            </div>
          </button>

          <button
            type="button"
            aria-label="Meditate"
            onClick={() => setView("meditate")}
            className={`p-4 border-sm border-2 rounded-md ${
              theme === "dark" ? "border-white" : "border-black"
            } relative ${
              view === "meditate"
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={
                  theme === "dark"
                    ? view === "meditate"
                      ? "/icons/meditate.png"
                      : "/icons/meditate-white.png"
                    : view === "meditate"
                    ? "/icons/meditate-white.png"
                    : "/icons/meditate.png"
                }
                alt="Meditate Icon"
                width={24}
                height={24}
              />
            </div>
          </button>

          <button
            type="button"
            aria-label="todo"
            onClick={() => setView("todo")}
            className={`p-4 border-sm border-2 rounded-md ${
              theme === "dark" ? "border-white" : "border-black"
            } relative ${
              view === "todo"
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={
                  theme === "dark"
                    ? view === "todo"
                      ? "/icons/todo.png"
                      : "/icons/todo-white.png"
                    : view === "todo"
                    ? "/icons/todo-white.png"
                    : "/icons/todo.png"
                }
                alt="todo Icon"
                width={22}
                height={22}
              />
            </div>
          </button>

          <button
            type="button"
            aria-label="quotes"
            onClick={() => setView("quotes")}
            className={`p-4 border-sm border-2 rounded-md ${
              theme === "dark" ? "border-white" : "border-black"
            } relative ${
              view === "quotes"
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={
                  theme === "dark"
                    ? view === "quotes"
                      ? "/icons/quotes.png"
                      : "/icons/quotes-white.png"
                    : view === "quotes"
                    ? "/icons/quotes-white.png"
                    : "/icons/quotes.png"
                }
                alt="Quotes Icon"
                width={14}
                height={14}
              />
            </div>
          </button>

          <button
            type="button"
            aria-label="gratitude"
            onClick={() => setView("gratitude")}
            className={`p-4 border-sm border-2 rounded-md ${
              theme === "dark" ? "border-white" : "border-black"
            } relative ${
              view === "gratitude"
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={
                  theme === "dark"
                    ? view === "gratitude"
                      ? "/icons/gratitude.png"
                      : "/icons/gratitude-white.png"
                    : view === "gratitude"
                    ? "/icons/gratitude-white.png"
                    : "/icons/gratitude.png"
                }
                alt="Gratitude Icon"
                width={17}
                height={17}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ——————————————————————————————————————————————————————————————————— */}

      <div className="flex items-center justify-center h-screen">
        {view === "text" && (
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
        )}

        {view === "breathe" && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-8 items-center">
              {/* Container for Circle */}
              <div className="relative">
                {" "}
                {/* Constant outer circle */}
                <div
                  className={`w-56 h-56 rounded-full border-2 ${
                    theme === "light" ? "border-black" : "border-zinc-50"
                  }`}
                ></div>
                {/* Animated inner circle */}
                <div
                  className={`h-56 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    ${
      isBreathing
        ? selectedSpeed === "relax"
          ? "animate-breathe-relax w-56"
          : selectedSpeed === "energy"
          ? "animate-breathe-energy w-56"
          : selectedSpeed === "sleep"
          ? "animate-breathe-sleep w-56"
          : ""
        : "w-0"
    } 
    ${theme === "light" ? "bg-black" : "bg-zinc-50"}`}
                ></div>
              </div>
            </div>
            <div className="font-medium pt-8 relative h-6">
              <span
                className={`fixed-width-text ${
                  isBreathing
                    ? selectedSpeed === "energy"
                      ? "text-energy"
                      : selectedSpeed === "sleep"
                      ? "text-sleep"
                      : selectedSpeed === "relax"
                      ? "text-relax"
                      : ""
                    : ""
                }`}
              ></span>
            </div>
          </div>
        )}

        {view === "meditate" && (
          <div className="w-full overflow-hidden flex items-center justify-center h-full">
            <div
              className={`w-96 h-10 ${
                theme === "light" ? "bg-black" : "bg-zinc-50"
              } relative rounded-full`}
            >
              <div
                className={`w-full h-full absolute rounded-full ${
                  theme === "light" ? "bg-zinc-50" : "bg-black"
                } ${
                  !isMeditating
                    ? ""
                    : selectedDuration === 5
                    ? "meditate-5m"
                    : selectedDuration === 10
                    ? "meditate-10m"
                    : selectedDuration === 15
                    ? "meditate-15m"
                    : selectedDuration === 20
                    ? "meditate-20m"
                    : selectedDuration === 30
                    ? "meditate-30m"
                    : selectedDuration === 60
                    ? "meditate-60m"
                    : ""
                }`}
              ></div>
              <div
                className={`w-96 h-10 border-2 ${
                  theme === "light" ? "border-black" : "border-zinc-50"
                } absolute rounded-full`}
              ></div>
            </div>
          </div>
        )}

        {view === "todo" && (
          <div className="w-full overflow-hidden flex items-center justify-center h-full max-w-lg">
            <div className="flex flex-col gap-2 max-h-120 overflow-y-auto w-full">
              {todos.map((todo, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-start gap-4 w-full"
                >
                  <div
                    className={`cursor-pointer border-2 rounded-sm w-6 h-6 
                        ${theme === "light" ? "border-black" : "border-white"}
                        ${
                          todo.isChecked
                            ? theme === "light"
                              ? "bg-black"
                              : "bg-white"
                            : ""
                        }`}
                    onClick={() => toggleTodo(index)}
                  ></div>
                  <div
                    ref={index === todos.length - 1 ? editableRef : null}
                    className="whitespace-pre-wrap w-full outline-none font-normal leading-8 text-xl relative"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onKeyPress={handleKeyPress}
                    onFocus={(event) => {
                      setActiveTodoIndex(index);
                      if (event.currentTarget.innerHTML === "") {
                        event.currentTarget.innerHTML = "<br>";
                      }
                    }}
                    onBlur={(event) => {
                      setActiveTodoIndex(null);
                      // Save changes to todo.text here
                      // Consider updating the todo list with the edited text
                    }}
                  >
                    {todo.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "quotes" && (
          <div className="w-full overflow-hidden flex items-center justify-center h-full max-w-lg">
            <div className="flex flex-col gap-4 w-full">
              <p className="font-medium leading-8 text-xl">
                “{currentQuote.quote}”
              </p>
              <p className="pl-12 font-regular">—{currentQuote.person}</p>
            </div>
          </div>
        )}

        {view === "gratitude" && (
          <div className="w-full overflow-hidden flex items-center justify-center h-full max-w-lg">
            <div className="flex flex-col gap-2 max-h-120 overflow-y-auto w-full">
              {gratitudeEntries.map((entry, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-start gap-1 w-full"
                >
                  <div
                    ref={
                      index === gratitudeEntries.length - 1 ? editableRef : null
                    }
                    className="whitespace-pre-wrap w-full outline-none font-normal leading-8 text-xl relative gratitude-entry"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onKeyPress={handleGratitudeKeyPress}
                    onFocus={(event) => {
                      setActiveEntryIndex(index);
                      if (event.currentTarget.innerHTML === "") {
                        event.currentTarget.innerHTML = "<br>";
                      }
                    }}
                    onBlur={(event) => {
                      setActiveEntryIndex(null);
                      // Save changes to entry.text here
                      const newEntries = [...gratitudeEntries];
                      newEntries[index].text = event.currentTarget.innerHTML;
                      setGratitudeEntries(newEntries);
                    }}
                  >
                    {entry.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ——————————————————————————————————————————————————————————————————— */}

      <div className="flex font-neue-haas font-medium justify-between items-end">
        {view === "text" ? (
          <div className="flex flex-row gap-8">
            <button
              type="button"
              aria-label="save"
              onClick={saveText}
              className={`py-1 px-4 border-sm border-2 rounded-md ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
              save
            </button>
            <button type="button" onClick={clearText}>
              clear
            </button>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}

        {view === "breathe" ? (
          <div className="flex flex-row gap-4">
            <button
              type="button"
              aria-label="toggleBreathing"
              onClick={toggleBreathing}
              className={`py-1 px-4 border-sm border-2 rounded-md w-20 
        ${
          isBreathing
            ? theme === "dark"
              ? "bg-white text-black border-white"
              : "bg-black text-white border-black"
            : theme === "dark"
            ? "border-white"
            : "border-black"
        }`}
            >
              {isBreathing ? "pause" : "start"}
            </button>
            <button
              type="button"
              aria-label="energy"
              onClick={() => {
                setSelectedSpeed("energy");
              }}
              className={`py-1 px-4 border-sm border-2 rounded-md ${
                selectedSpeed === "energy"
                  ? theme === "dark"
                    ? "bg-white text-black border-white"
                    : "bg-black text-white border-black"
                  : theme === "dark"
                  ? "border-white"
                  : "border-black"
              }`}
            >
              2-1-6
            </button>
            <button
              type="button"
              aria-label="relax"
              onClick={() => {
                setSelectedSpeed("relax");
              }}
              className={`py-1 px-4 border-sm border-2 rounded-md ${
                selectedSpeed === "relax"
                  ? theme === "dark"
                    ? "bg-white text-black border-white"
                    : "bg-black text-white border-black"
                  : theme === "dark"
                  ? "border-white"
                  : "border-black"
              }`}
            >
              4-4-4-4
            </button>
            <button
              type="button"
              aria-label="sleep"
              onClick={() => {
                setSelectedSpeed("sleep");
              }}
              className={`py-1 px-4 border-sm border-2 rounded-md ${
                selectedSpeed === "sleep"
                  ? theme === "dark"
                    ? "bg-white text-black border-white"
                    : "bg-black text-white border-black"
                  : theme === "dark"
                  ? "border-white"
                  : "border-black"
              }`}
            >
              4-7-8
            </button>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}

        {view === "meditate" ? (
          <div className="flex flex-row gap-4">
            <button
              type="button"
              aria-label="toggleMeditation"
              onClick={toggleMeditation}
              className={`py-1 px-4 border-sm border-2 rounded-md w-20 
        ${
          isMeditating
            ? theme === "dark"
              ? "bg-white text-black border-white"
              : "bg-black text-white border-black"
            : theme === "dark"
            ? "border-white"
            : "border-black"
        }`}
            >
              {isMeditating ? "pause" : "start"}
            </button>

            {
              // Using map to reduce code repetition
              [5, 10, 15, 20, 30, 60].map((duration) => (
                <button
                  key={duration}
                  type="button"
                  aria-label={`${duration} minutes`}
                  onClick={() => {
                    setSelectedDuration(duration);
                  }}
                  className={`py-1 px-2 border-sm border-2 rounded-md ${
                    selectedDuration === duration
                      ? theme === "dark"
                        ? "bg-white text-black border-white"
                        : "bg-black text-white border-black"
                      : theme === "dark"
                      ? "border-white"
                      : "border-black"
                  }`}
                >
                  {duration}
                </button>
              ))
            }
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}

        {view === "todo" ? (
          <div className="flex flex-row gap-8">
            <button
              type="button"
              aria-label="all done"
              onClick={markAllDone}
              className={`py-1 px-4 border-sm border-2 rounded-md ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
              all done
            </button>
            <button type="button" onClick={clearTodos}>
              clear
            </button>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}

        {view === "quotes" ? (
          <div className="flex flex-row gap-8">
            <button
              type="button"
              aria-label="new quote"
              onClick={getRandomQuote}
              className={`py-1 px-4 border-sm border-2 rounded-md ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            >
              next
            </button>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}

        {view === "gratitude" ? (
          <div className="flex flex-row gap-8">
            <button
              type="button"
              onClick={clearGratitude}
            >
              clear
            </button>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}

        <a
          href="https://portfolio-alexakten.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>© 2023</p>
        </a>
      </div>
    </main>
  );
}
