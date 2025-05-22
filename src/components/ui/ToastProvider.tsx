"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ToastProvider() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only update after component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: mounted
          ? {
              background: resolvedTheme === "dark" ? "#1F2937" : "#ffffff",
              color: resolvedTheme === "dark" ? "#F3F4F6" : "#333333",
              padding: "16px",
              borderRadius: "8px",
              boxShadow:
                resolvedTheme === "dark"
                  ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                  : "0 4px 12px rgba(0, 0, 0, 0.1)",
            }
          : {
              background: "#ffffff",
              color: "#333333",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: mounted && resolvedTheme === "dark" ? "#1F2937" : "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: mounted && resolvedTheme === "dark" ? "#1F2937" : "#ffffff",
          },
        },
      }}
    />
  );
} 