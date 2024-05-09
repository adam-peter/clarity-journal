import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 h-full w-48 border-r border-primary/50">
        <div>Clarity Journal</div>
        <ul>
          {links.map((link) => (
            <li key={link.label} className="px-2 py-6 text-xl">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-48 h-full">
        <header className="h-14 border-b border-primary/50">
          <div className="flex h-full w-full items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        {/* substract height from the header */}
        <div className="h-[calc(100vh-3.5rem)]">{children}</div>{" "}
      </div>
    </div>
  );
};

type Props = { children: React.ReactNode };

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

export default DashboardLayout;
