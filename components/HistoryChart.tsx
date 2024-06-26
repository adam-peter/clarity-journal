"use client";
import React from "react";
import {
  ResponsiveContainer,
  Line,
  Tooltip,
  XAxis,
  LineChart,
  YAxis,
} from "recharts";
import CustomToolTip from "./CustomToolTip";

const HistoryChart = ({
  data,
}: {
  data: {
    sentimentScore: number;
    createdAt: Date;
    mood: string;
    color: string;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis
          dataKey="createdAt"
          tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
        />
        <YAxis dataKey="sentimentScore" />
        {/*@ts-ignore*/}
        <Tooltip content={<CustomToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
