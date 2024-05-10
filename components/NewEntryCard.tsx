"use client";

import React from "react";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";

const NewEntryCard = () => {
  const router = useRouter();
  const onClick = async () => {
    const data = await createNewEntry(); // no point in getting the return value; we're just fetching the data here
    router.push(`/journal/${data.id}`);
  };

  return (
    <Card
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center px-4 py-5 text-3xl transition-colors duration-300 hover:border-2  hover:border-slate-600 hover:bg-black sm:p-6"
    >
      New Entry
    </Card>
  );
};

export default NewEntryCard;
