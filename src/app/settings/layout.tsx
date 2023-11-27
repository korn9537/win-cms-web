"use client";

import AppLayout from "@/components/layouts/AppLayout";
import { IconInformation } from "@/components/Icons";
import { MyMenu } from "@/components/layouts/AppMenu";
import _ from "lodash";

export const SETIING_MENUS: MyMenu[] = [
  {
    key: "setting-organize",
    title: "ข้อมูลผู้ใช้งาน",
    image: "/images/modules/1.png",
    // href: "/setting-data",
    icon: <IconInformation />,
    subMenus: [
      {
        icon: <IconInformation />,
        key: "users",
        title: "ผู้ใช้งาน",
        href: "/settings/organize/users"
      },
      {
        icon: <IconInformation />,
        key: "permissions",
        title: "สิทธิการใช้งาน",
        href: "/settings/organize/permissions"
      }
    ]
  },
  {
    icon: <IconInformation />,
    key: "departments",
    title: "แผนก",
    href: "/settings/organize/departments"
  },
  {
    icon: <IconInformation />,
    key: "positions",
    title: "ตำแหน่งงาน",
    href: "/settings/organize/positions"
  }
];

type CompanyLayoutProps = {
  children: React.ReactNode;
};

export default function CompanyLayout(props: CompanyLayoutProps) {
  return (
    <AppLayout
      requireAuth
      menus={SETIING_MENUS}
      navbarProps={{
        hideModuleSelector: true
      }}
    >
      {props.children}
    </AppLayout>
  );
}
