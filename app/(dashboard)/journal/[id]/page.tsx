import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);
  return (
    <div className="p-10 h-full w-full">
      {<Editor entry={entry!} />}
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
