"use client";

import React, { useState } from "react";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import LoadingSpinner from "./LoadingSpinner";

const NewEntryCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
    setIsLoading(false);
  };

  return (
    <Button onClick={onClick} disabled={isLoading} asChild variant="ghost">
      <Card className={`flex h-full cursor-pointer items-center justify-center px-4 py-5 text-3xl transition-colors duration-300 hover:border-2 hover:border-slate-600 hover:bg-black sm:p-6 ${isLoading && "hover:border-inherit hover:bg-inherit"}`}>
        {isLoading ? <LoadingSpinner /> : "New Entry"}
      </Card>
    </Button>
  );
};

export default NewEntryCard;
