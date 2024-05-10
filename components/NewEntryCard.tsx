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
      className="cursor-pointer px-4 py-5 text-3xl sm:p-6"
    >
      New Entry
    </Card>
  );
};

export default NewEntryCard;
