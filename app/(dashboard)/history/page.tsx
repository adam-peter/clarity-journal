import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";

const History = async () => {
  const { avg, analysies } = await getData();

  return (
    <div className="h-full w-full">
      <h2>Average Mood Sentiment: {avg}</h2>
      <div className="h-[90%] w-[90%]">
        <HistoryChart data={analysies} />
      </div>
    </div>
  );
};

const getData = async () => {
  const user = await getUserByClerkId();
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

  const sum = analysies
    .map((a) => a.sentimentScore)
    .reduce((all, curr) => all + curr);

  const avg = Math.round(sum / analysies.length);

  return { avg, analysies };
};

export default History;
