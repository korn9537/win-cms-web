import ModuleLayout from "@/components/layouts/ModuleLayout";
import React from "react";

export default function MasterDataLayout(props: { children: React.ReactNode }) {
  // return <ModuleLayout title="ระบบข้อมูลกลาง">{props.children}</ModuleLayout>;
  return <ModuleLayout>{props.children}</ModuleLayout>;
}
