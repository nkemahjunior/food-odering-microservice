"use client";

import React, { useState, Dispatch, SetStateAction } from "react";

// Correct the return type to account for inconsistent behavior
function useBrokenHook(): [
  boolean,
  Dispatch<SetStateAction<boolean>> | (() => void)
] {
  if (Math.random() > 0.5) {
    const [state, setState] = useState(false); // Invalid: Hook called conditionally
    return [state, setState];
  }
  return [false, () => {}];
}

export default function TestHookViolation() {
  const [value, setValue] = useBrokenHook(); // Still violates hooks rules for testing ESLint

  return (
    <div>
      <p>Value: {value.toString()}</p>
      <button
        onClick={() =>
          typeof setValue === "function" && setValue((prev: boolean) => !prev)
        }
      >
        Toggle Value
      </button>
    </div>
  );
}
