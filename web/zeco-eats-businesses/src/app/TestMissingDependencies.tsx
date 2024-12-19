"use client";

import React, { useState, useEffect } from "react";

export default function TestMissingDependencies() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  // Missing `increment` dependency
  useEffect(() => {
    const interval = setInterval(() => {
      increment(); // This will cause issues because the dependency is missing.
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Dependency array is empty, but `increment` is used.

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
