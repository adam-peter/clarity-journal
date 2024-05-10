import { JournalEntryWithAnalysis } from "@/types";
import React from "react";
import { Card } from "./ui/card";

const EntryCard = ({ entry }: { entry: JournalEntryWithAnalysis }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <Card className="flex h-full w-full flex-col divide-y divide-slate-600 transition-colors duration-300 hover:border-2 hover:border-slate-600 hover:bg-black">
      <div className="flex h-full items-center justify-between px-6 py-10 text-xl">
        {entry?.analysis?.summary}
      </div>

      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <div
            className="h-4 min-h-4 w-4 min-w-4 rounded-full border border-slate-600"
            style={{ backgroundColor: entry.analysis?.color }}
          />
          <div>{entry?.analysis?.mood}</div>
        </div>
        <div>{date}</div>
      </div>
    </Card>
  );
};

export default EntryCard;
