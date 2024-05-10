import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 flex h-full w-48 flex-col gap-2 p-3">
        <Button className="text-center text-4xl" variant="link" size="lg">
          <Link href="/">Clarity</Link>
        </Button>
        {links.map((link) => (
          <Button
            key={link.label}
            variant="link"
            size="lg"
            className="text-2xl font-extralight"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </aside>
      <div className="ml-48 h-full flex flex-col ">
        <header className="h-14">
          <div className="flex h-full w-full items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        {/* substract height from the header */}
        <div className="h-full border-l border-t border-primary/50">
          {children}
        </div>{" "}
      </div>
    </div>
  );
};

type Props = { children: React.ReactNode };

const links = [
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

export default DashboardLayout;
