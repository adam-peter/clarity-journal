import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId();
  const { content } = await req.json();

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      id_userId: {
        id: params.id,
        userId: user.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);

  // upsert - update or create
  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      journalEntryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      journalEntryId: updatedEntry.id,
      ...analysis!,
    },
    update: analysis!,
  });

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};
