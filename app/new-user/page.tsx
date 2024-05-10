import React from "react";
import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const NewUser = async () => {
  await createNewUser();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

const createNewUser = async () => {
  const user = await currentUser();

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
  });

  if (!existingUser) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }

  redirect("/journal");
};

export default NewUser;
