"use client";
import { askQuestion } from "@/utils/api";
import React, { FormEvent, useState, KeyboardEvent } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { X } from "lucide-react";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
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
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Ask Question</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex h-[70vh] flex-col items-center gap-4 py-10">
              <DrawerHeader className="flex w-1/2 items-center justify-between px-0">
                <DrawerTitle className="text-2xl ">
                  Ask a question about your journal entries!
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button size="icon" variant="ghost">
                    <X className="h-6 w-6" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex w-1/2 gap-2">
                <Input
                  type="text"
                  disabled={loading}
                  placeholder="How was I feeling recently?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSubmit(e);
                    }
                  }}
                  className=""
                />
                <Button type="submit" disabled={loading}>
                  Submit
                </Button>
              </div>

              <ScrollArea className="w-1/2 p-2">
                {response && <div>{response}</div>}
              </ScrollArea>
            </div>
          </DrawerContent>
        </Drawer>
      </form>
      {loading && <div>...loading</div>}
    </div>
  );
};

export default Question;
