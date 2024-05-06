import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);

  const analysisData = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: "False" },
  ];

  return (
    <div className="grid h-full w-full grid-cols-3 p-10">
      <div className="col-span-2">{<Editor entry={entry!} />}</div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
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

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id_userId: {
        // compound unique index
        id,
        userId: user.id,
      },
    },
  });
  return entry;
};

export default EntryPage;
