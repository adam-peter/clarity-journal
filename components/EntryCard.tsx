import { JournalEntryWithAnalysis } from "@/types";
import React from "react";
import { Card } from "./ui/card";

const EntryCard = ({ entry }: { entry: JournalEntryWithAnalysis }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <Card className="flex h-full w-full flex-col divide-y divide-gray-200">
      <div className="flex h-full items-center justify-between px-4 py-5">
        <div className="px-2 py-5 text-xl">{entry?.analysis?.summary}</div>
        <div
          className="h-4 min-h-4 w-4 min-w-4 rounded-full"
          style={{ backgroundColor: entry.analysis?.color }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-5">
        <div>{entry?.analysis?.mood}</div>
        <div>{date}</div>
      </div>
    </Card>
  );
};

export default EntryCard;
