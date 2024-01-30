"use client";
import Link from "next/link";
import React from "react";
import Navbar from "./components/Navbar";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";

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
      <div className="flex h-screen flex-col gap-6 text-center items-center justify-center">
        <h1 className="text-[clamp(42px,5.5vw,84px)] font-medium leading-[0.95]">
          Write with zero
          <br /> distractions.
        </h1>
        <p className="text-lg text-medium opacity-50 sm:text-xl max-w-md ">
          Strōm is a minimalistic & clutter-free tool that enables you to focus
          on writing.
        </p>
        <Link href={"/type"}>
          <button
            className={`px-4 py-2 rounded-full font-medium ${
              theme === "light"
                ? "bg-blue-500 text-zinc-50 hover:bg-blue-600"
                : "bg-blue-500 text-zinc-50 hover:bg-blue-600"
            }`}
          >
            Start writing
          </button>
        </Link>
        {/* -------------------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-20 pt-16">
          {/* -------------------------------------------------------------------------- */}
          <div className="flex items-start text-left flex-col gap-1 max-w-[156px]">
            <p className="font-medium">No distractions</p>
            <p className="font-thin opacity-50 leading-tight">
              One font, one color, one feature—writing.
            </p>
          </div>
          {/* -------------------------------------------------------------------------- */}
          <div className="flex items-start text-left flex-col gap-1 max-w-[156px]">
            <p className="font-medium">Minimal editing</p>
            <p className="font-thin opacity-50 leading-tight">
              You can only edit your last line.
            </p>
          </div>
          {/* -------------------------------------------------------------------------- */}
          <div className="flex items-start text-left flex-col gap-1 max-w-[156px]">
            <p className="font-medium">Dark mode</p>
            <p className="font-thin opacity-50 leading-tight">
              Switch between light or dark mode.
            </p>
          </div>
          {/* -------------------------------------------------------------------------- */}
          <div className="flex items-start text-left flex-col gap-1 max-w-[156px]">
            <p className="font-medium">Fully private</p>
            <p className="font-thin opacity-50 leading-tight">
              Everything is only saved locally.
            </p>
          </div>
          {/* -------------------------------------------------------------------------- */}
        </div>
        {/* -------------------------------------------------------------------------- */}
      </div>
    </main>
  );
}
