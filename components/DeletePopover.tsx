"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { deleteEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { PopoverClose } from "@radix-ui/react-popover";

const DeletePopover = ({
  entryId,
  navigate = false,
}: {
  entryId: string;
  navigate?: boolean;
}) => {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-black">
          <Trash2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 bg-background">
        <div className="">
          Are you sure you want to delete this journal entry?
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <Button
            variant="destructive"
            onClick={async () => {
              const data = await deleteEntry(entryId);
              if (navigate && data?.deleted) {
                router.refresh();
                router.replace("/journal");
              }
            }}
          >
            Yes
          </Button>
          <Button asChild variant="outline">
            <PopoverClose>No</PopoverClose>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeletePopover;
