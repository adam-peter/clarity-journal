import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 h-full w-48 border-r border-black/10">
        Mood
      </aside>
      <div className="ml-48 h-full">
        <header className="h-14 border-b border-black/10">
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

export default DashboardLayout;
