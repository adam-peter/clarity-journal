import React from "react";
import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import ErrorPanel from "@/components/ErrorPanel";

const History = async () => {
  const { avg, analysies, error } = await getData();

  return (
    <div className="h-full w-full">
      {error ? (
        <ErrorPanel />
      ) : (
        <>
          <h2 className="py-2 text-center">Average Mood Sentiment: {avg}</h2>
          <div className="h-[90%] w-[90%]">
            <HistoryChart data={analysies} />
          </div>
        </>
      )}
    </div>
  );
};

const getData = async () => {
  const user = await getUserByClerkId();
  if (!user) {
    return { avg: 0, analysies: [], error: "User not found." }; // Return error
  }

  const analysies = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
      createdAt: true,
      mood: true,
      color: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  if (analysies.length === 0) {
    return { avg: 0, analysies, error: "No journal entries" }; // No error, just empty data
  }

  const sum = analysies.reduce(
    (total, analysis) => total + analysis.sentimentScore,
    0,
  );
  const avg = Math.round(sum / analysies.length);
  return { avg, analysies }; // No error
};

export default History;
