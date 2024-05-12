import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { log } from "console";
import { revalidatePath } from "next/cache";
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

  revalidatePath("/journal");

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId();

  try {
    await prisma.analysis.deleteMany({
      where: {
        journalEntryId: params.id,
      },
    });

    await prisma.journalEntry.delete({
      where: {
        id_userId: {
          id: params.id,
          userId: user.id,
        },
      },
    });
  } catch (e) {
    log(`Error deleting journal entry #${params.id}: ${e}`);
    return NextResponse.json({
      data: { deleted: false },
    });
  }

  revalidatePath("/journal");

  return NextResponse.json({
    data: { deleted: true },
  });
};
