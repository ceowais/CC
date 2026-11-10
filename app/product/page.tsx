"use client";

import { useState } from "react";
import { ProductDetails } from "@/components/ProductDetails";

export default function ProductLookupRoute() {
  const [slug] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return new URLSearchParams(window.location.search).get("slug") || "";
  });

  if (!slug) return null;
  return <ProductDetails slug={slug} />;
}
