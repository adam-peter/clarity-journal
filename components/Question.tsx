"use client";
import React, { FormEvent, useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Ask a question"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-lg rounded-r-none border border-r-0 border-b-black/20 px-4 py-2 text-lg"
      />
      <button
        type="submit"
        className="rounded-lg rounded-l-none border border-l-0 border-b-black/20 bg-blue-400 px-4 py-2 text-lg"
      >
        Ask
      </button>
    </form>
  );
};

export default Question;
