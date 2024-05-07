"use client";
import React, { useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/utils/api";

const Editor = ({ entry }: { entry: any }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const {
    mood = "",
    summary = "",
    subject = "",
    color = "#ffffff",
    negative = false,
  } = analysis;

  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  useAutosave({
    data: value,
    onSave: async (newValue) => {
      setIsLoading(true);
      const updatedEntry = await updateEntry(entry.id, newValue);
      setAnalysis(updatedEntry.analysis);
      setIsLoading(false);
    },
    interval: 2_000,
  });

  return (
    <div className="grid h-full w-full grid-cols-3 p-10">
      <div className="col-span-2">
        {isLoading && <div>...loading</div>}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-full w-full p-4 text-xl outline-none"
        ></textarea>
      </div>

      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <ul>
          {analysisData.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between border-y border-black/10 px-2 py-4"
            >
              <span className="text-lg font-semibold">{item.name}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Editor;
