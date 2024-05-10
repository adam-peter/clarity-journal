import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const { userId } = await auth();
  const startHref = userId ? "/journal" : "/new-user";

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black p-2 text-white">
      <div className="mx-auto w-full max-w-[600px]">
        <h1 className="mb-4 text-center text-6xl">Clarity Journal</h1>
        <p className="mb-4 text-2xl text-white/60">
          In the modern day, we&apos;re getting more and more lost in our
          thoughts. They are always moving to fast. We get overwhelmed by them.
          But most importantly, we don&apos;t understand them.
        </p>
        <p className="mb-6 text-2xl text-white/60">
          Clarity is here to help you organize, understand and monitor your
          thoughts better.
        </p>
        <div className="flex justify-center">
          <Link href={startHref}>
            <Button size="lg" className="text-foreground">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
