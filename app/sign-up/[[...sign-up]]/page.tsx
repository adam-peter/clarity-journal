import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <SignUp path="/sign-up" />
    </div>
  );
};

export default SignUpPage;
