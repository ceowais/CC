"use client";

import { useState } from "react";
import { AdminPanel } from "@/components/AdminPanel";

export default function AdminSectionRoute() {
  const [section] = useState(() => {
    if (typeof window === "undefined") {
      return "dashboard";
    }

    return new URLSearchParams(window.location.search).get("section") || "dashboard";
  });

  return <AdminPanel section={section} />;
}
