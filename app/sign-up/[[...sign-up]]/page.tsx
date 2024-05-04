import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp path="/sign-up" forceRedirectUrl="/new-user" />;
};

export default SignUpPage;
