"use client";

import React from "react";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();
  const onClick = async () => {
    const data = await createNewEntry(); // no point in getting the return value; we're just fetching the data here
    router.push(`/journal/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={onClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
