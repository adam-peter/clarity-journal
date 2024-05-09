import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <SignIn path="/sign-in" />
    </div>
  );
};

export default SignInPage;
