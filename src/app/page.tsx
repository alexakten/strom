import Link from "next/link";
import Navbar from "./components/Navbar";
import React, { useContext, useEffect } from "react";

export default function Home() {
  return (
    <main className="flex h-[100svh] flex-col justify-between bg-neutral-950 text-white">
      {/* -------------------------------------------------------------------------- */}
      <Navbar showThemeSwitcher={false} showAuthButtons={true} />
      {/* -------------------------------------------------------------------------- */}
      <div className="flex h-screen flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-[clamp(42px,5.5vw,72px)] font-medium leading-[0.95] tracking-[-1px]">
          Write with zero
          <br /> distractions
        </h1>
        <p className="max-w-[340px] text-lg opacity-50">
          Mendly is a minimalistic writing tool that helps you focus on your
          ideas.
        </p>
        <Link href={"/api/auth/login?post_login_redirect_url=%2Ftype"}>
          <button className="rounded-full bg-blue-500 px-4 py-2 font-medium text-zinc-50 hover:bg-blue-600">
            Start writing
          </button>
        </Link>

        {/* -------------------------------------------------------------------------- */}
        <div className="hidden gap-20 pt-16 md:grid md:grid-cols-2 lg:grid-cols-4">
          {/* -------------------------------------------------------------------------- */}
          <div className="flex max-w-[156px] flex-col items-start gap-1 text-left">
            <p className="font-medium">No distractions</p>
            <p className="font-thin leading-tight opacity-50">
              One font, one color, one feature—writing.
            </p>
          </div>
          {/* -------------------------------------------------------------------------- */}
          <div className="flex max-w-[156px] flex-col items-start gap-1 text-left">
            <p className="font-medium">Minimal editing</p>
            <p className="font-thin leading-tight opacity-50">
              You can only edit your last line.
            </p>
          </div>
          {/* -------------------------------------------------------------------------- */}
          <div className="flex max-w-[156px] flex-col items-start gap-1 text-left">
            <p className="font-medium">Dark mode</p>
            <p className="font-thin leading-tight opacity-50">
              Switch between light or dark mode.
            </p>
          </div>
          {/* -------------------------------------------------------------------------- */}
          <div className="flex max-w-[156px] flex-col items-start gap-1 text-left">
            <p className="font-medium">Fully private</p>
            <p className="font-thin leading-tight opacity-50">
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
