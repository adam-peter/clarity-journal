"use client";
import React, { useState } from "react";
import { JournalEntry } from "@prisma/client";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/utils/api";

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  useAutosave({
    data: value,
    onSave: async (newValue) => {
      setIsLoading(true);
      const updatedEntry = await updateEntry(entry.id, newValue);
      setIsLoading(false);
    },
    interval: 10_000,
  });

  return (
    <div className="h-full w-full">
      {isLoading && <div>...loading</div>}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-full w-full p-4 text-xl outline-none"
      ></textarea>
    </div>
  );
};

export default Editor;
