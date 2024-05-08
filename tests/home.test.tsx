import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../app/page";
import React from "react";

// mock out the data
vi.mock("@clerk/nextjs", () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: "1" })),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_id",
        fullName: "Adam Peter",
      },
    }),
  };
});

test("Home", async () => {
  render(await Home());
  expect(screen.getByText("the best app")).toBeTruthy();
});
