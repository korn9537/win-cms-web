"use client";

import AppLayout from "@/components/layouts/AppLayout";
import { IconInformation } from "@/components/Icons";
import { MyMenu } from "@/components/layouts/AppMenu";
import _ from "lodash";

export const MODULE_MENUS: MyMenu[] = [
  {
    key: "master-data",
    title: "ระบบจัดการข้อมูลกลาง",
    description: "เครื่องมือบริหารจัดการข้อมูลกลาง",
    image: "/images/modules/1.png",
    href: "/master-data",
    icon: <IconInformation />,
    subMenus: [
      {
        icon: <IconInformation />,
        key: "company",
        title: "ข้อมูลบริษัท",
        href: "/master-data/company"
      },
      {
        icon: <IconInformation />,
        key: "project",
        title: "ข้อมูลโครงการ",
        href: "/master-data/project",
        subMenus: [
          {
            key: "project-list",
            title: "ข้อมูลพื้นฐาน",
            href: "/master-data/project/list"
          },
          {
            key: "project-list",
            title: "เฟส/เฟสย่อย",
            href: "/master-data/phase"
          }
        ]
      }
    ]
  },
  {
    key: "2",
    title: "ระบบจัดการงบประมาณ",
    description: "เครื่องมือบริหารและควบคุมงบประมาณ",
    image: "/images/modules/2.png",
    href: "/",
    icon: <IconInformation />,
    subMenus: [
      {
        key: "2-1",
        title: "รายการงบประมาณ",
        href: "/"
      },
      {
        key: "2-2",
        title: "รายงาน",
        href: "/"
      }
    ]
  },
  {
    key: "boq",
    title: "ระบบจัดการ BOQ",
    description: "เครื่องมือบริหารการสั่งสร้างและควบคุม BOQ",
    image: "/images/modules/3.png",
    href: "/boq",
    icon: <IconInformation />,
    subMenus: [
      {
        key: "boq-1",
        title: "สั่งสร้าง",
        href: "/boq"
      },
      {
        key: "boq-2",
        title: "BOQ Master",
        href: "/"
      },
      {
        key: "boq-3",
        title: "รายงาน",
        href: "/"
      }
    ]
  },
  {
    key: "4",
    title: "ระบบจัดการสำนักงาน",
    description: "เครื่องมือบริหารจัดการใบเบิก",
    image: "/images/modules/4.png",
    href: "/",
    icon: <IconInformation />
  },
  {
    key: "5",
    title: "ระบบจัดซื้อ",
    description: "เครื่องมือบริหารจัดการใบสั่งซื้อและใบจัดซื้อ",
    image: "/images/modules/5.png",
    href: "/",
    icon: <IconInformation />
  },
  {
    key: "6",
    title: "ระบบจัดจ้าง",
    description: "เครื่องมือบริหารจัดการใบสั่งจ้าง",
    image: "/images/modules/6.png",
    href: "/",
    icon: <IconInformation />
  },
  {
    key: "7",
    title: "ระบบปันส่วน",
    description: "เครื่องมือบริหารการปันส่วนวัสดุและค่าแรง",
    image: "/images/modules/7.png",
    href: "/",
    icon: <IconInformation />
  },
  {
    key: "8",
    title: "ระบบวางบิล",
    description: "เครื่องมือบริหารจัดการใบวางบิล",
    image: "/images/modules/8.png",
    href: "/",
    icon: <IconInformation />
  },
  {
    key: "9",
    title: "รายงาน",
    description: "เครื่องมือตรวจสอบและดูรายละเอียดรายงาน",
    image: "/images/modules/9.png",
    href: "/",
    icon: <IconInformation />
  }
];

type CompanyLayoutProps = {
  children: React.ReactNode;
};

export default function CompanyLayout(props: CompanyLayoutProps) {
  return (
    <AppLayout
      requireAuth
      navbarProps={{
        hideModuleSelector: true
      }}
    >
      {props.children}
    </AppLayout>
  );
}
