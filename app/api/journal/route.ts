import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "New journal entry",
    },
  });

  const analysis = await analyze(entry.content);
  await prisma.analysis.create({
    // @ts-ignore
    data: {
      userId: user.id,
      journalEntryId: entry.id,
      ...analysis
    }
  })

  revalidatePath("/journal"); // to refresh the cached data

  return NextResponse.json({ data: entry });
};
