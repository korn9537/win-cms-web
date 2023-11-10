import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  redirect("/companies");

  return <div>page</div>;
}
