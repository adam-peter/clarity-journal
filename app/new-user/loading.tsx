import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
