"use client";
import Link from "next/link";
import React from "react";
import Navbar from "./components/Navbar";
import { useEffect, useState, useContext } from "react";

import ThemeContext from "./components/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <main
      style={{ userSelect: "none", height: "100svh" }}
      className={`flex flex-col justify-between w-screen h-screen px-4 xs:px-12 py-8 ${
        theme === "light"
          ? "bg-zinc-50 text-black"
          : "bg-neutral-950 text-white"
      }`}
    >
      {/* -------------------------------------------------------------------------- */}
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      {/* -------------------------------------------------------------------------- */}
      <div className="h-screen flex flex-col gap-6 text-center items-center justify-center">
        <h1 className="text-[clamp(42px,5.5vw,84px)] font-medium leading-[0.95]">
          Write with zero
          <br /> distractions.
        </h1>
        <p className="text-lg sm:text-xl max-w-md ">
          Strōm is a minimalistic & clutter-free tool that enables you to focus on writing.
        </p>
        <Link href={"/type"}>
          <button
            className={`px-4 py-3 rounded-full border border-black hover:bg-neutral-950 text-medium hover:text-white ${
              theme === "light"
                ? "border-neutral-950 text-black hover:bg-neutral-950 hover:text-white"
                : "border-zinc-50 text-white hover:bg-zinc-50 hover:text-black"
            }`}
          >
            Start writing
          </button>
        </Link>
      </div>
    </main>
  );
}
