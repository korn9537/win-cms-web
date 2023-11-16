"use client";

import PageLayout from "@/components/PageLayout";
import React from "react";
import { MODULE_MENUS } from "../../layout";

export default function MasterDataIndexPage() {
  return (
    <PageLayout
      type="detail"
      appMenuSize="small"
      moduleMenuSize="large"
      moduleMenus={MODULE_MENUS.find((w) => w.key == "master-data")?.subMenus}
    >
      <div>Master Data</div>
    </PageLayout>
  );
}
