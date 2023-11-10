"use client";

import PageLayout from "@/components/PageLayout";
import PageToolbar from "@/components/PageToolbar";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { ServiceCard } from "./components/ServiceCard";
import { MODULE_MENUS } from "../layout";

type ServiceSelectPageProps = {
  params: {
    company_code: string;
  };
};

export default function ServiceSelectPage(props: ServiceSelectPageProps) {
  const router = useRouter();

  // actions
  const handleOnClick = (href: string) => {
    router.push(`/company/${props.params.company_code}` + href);
  };

  return (
    <PageLayout type="detail" hiddenMenu>
      <Container>
        <PageToolbar title="เอ็ม บี เอส พร้อพเพอร์ตี้" backFunction={() => router.push("/companies")} />
        <Grid container spacing={SPACING_LAYOUT}>
          {MODULE_MENUS.map((menu) => (
            <Grid key={menu.key} item xs={4}>
              <ServiceCard
                title={menu.title}
                description={menu.description}
                image={menu.image}
                onClick={() => handleOnClick(menu.href || "")}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageLayout>
  );
}
