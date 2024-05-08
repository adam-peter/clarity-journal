"use client";
import { askQuestion } from "@/utils/api";
import React, { FormEvent, useState } from "react";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(question);
    setResponse(answer);
    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          disabled={loading}
          placeholder="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="rounded-lg rounded-r-none border border-r-0 border-b-black/20 px-4 py-2 text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg rounded-l-none border border-l-0 border-b-black/20 bg-blue-400 px-4 py-2 text-lg"
        >
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
