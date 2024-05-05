import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const { userId } = await auth();
  const startHref = userId ? "/journal" : "/new-user";

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black p-2 text-white">
      <div className="mx-auto w-full max-w-[600px]">
        <h1 className="mb-4 text-6xl">The Best Journal app, period.</h1>
        <p className="mb-4 text-2xl text-white/60">
          This is the best app for tracking your mood through out your life. All
          You have to do is be honest.
        </p>
        <div>
          <Link href={startHref}>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
