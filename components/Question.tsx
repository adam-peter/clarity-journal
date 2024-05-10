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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";

const formSchema = z.object({
  question: z.string(),
});

const Question = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setLoading(true);
    const answer = await askQuestion(value.question);
    setResponse(answer);
    form.reset();
    setLoading(false);
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="text-foreground">Ask Question</Button>
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

                <FormField
                  name="question"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex w-1/2 gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loading}
                          placeholder="How was I feeling recently?"
                          className=""
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="text-foreground"
                >
                  Submit
                </Button>

                <ScrollArea className="w-1/2 p-2">
                  {response && <div>{response}</div>}
                </ScrollArea>
              </div>
            </DrawerContent>
          </Drawer>
        </form>
      </Form>
      {loading && <div>...loading</div>}
    </div>
  );
};

export default Question;
