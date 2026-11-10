"use client";

import { useState } from "react";
import { OrderPage } from "@/components/CustomerPages";

export default function OrderLookupRoute() {
  const [id] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return new URLSearchParams(window.location.search).get("id") || "";
  });

  if (!id) return null;
  return <OrderPage id={id} />;
}
