"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

const ErrorPanel = () => {
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
    <div className="m-2 mx-auto flex w-max flex-col text-center text-xl">
      <h2 className="text-2xl">You have not written any journal entry yet!</h2>
      <p>
        Go write some entries and come back to see how your mood was over the
        times C:
      </p>
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="mx-auto mt-2 w-max text-foreground"
      >
        Write a new entry
      </Button>
      {isLoading && (
        <div className="mt-2 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ErrorPanel;
