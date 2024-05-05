import React from "react";

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 h-full w-48 border-r border-black/10">
        Mood
      </aside>
      <div className="ml-48">
        <header className="h-14 border-b border-black/10">hello</header>
        <div>{children}</div>
      </div>
    </div>
  );
};

type Props = { children: React.ReactNode };

export default DashboardLayout;
