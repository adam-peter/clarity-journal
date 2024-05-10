import { JournalEntryWithAnalysis } from "@/types";
import React from "react";
import { Card } from "./ui/card";

const EntryCard = ({ entry }: { entry: JournalEntryWithAnalysis }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <Card className="divide-y divide-gray-200">
      <div className="flex items-center justify-between px-4 py-5">
        <div>{date}</div>
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: entry.analysis?.color }}
        />
      </div>
      <div className="px-4 py-5">{entry?.analysis?.summary}</div>
      <div className="px-4 py-5">{entry?.analysis?.mood}</div>
    </Card>
  );
};

export default EntryCard;
