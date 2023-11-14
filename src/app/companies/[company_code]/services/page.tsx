"use client";

import PageLayout from "@/components/PageLayout";
import PageToolbar from "@/components/PageToolbar";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { ServiceCard } from "./components/ServiceCard";
import { useModuleLayoutStore } from "@/stores/module-layout.store";
import { CompanyModel } from "@/services/graphql/models/company.model";
import { MODULE_MENUS } from "../../layout";
import CleanContentBox from "@/components/CleanContentBox";

type ServiceSelectPageProps = {
  params: {
    company_code: string;
  };
};

export default function ServiceSelectPage(props: ServiceSelectPageProps) {
  // statics
  const router = useRouter();
  const company = useModuleLayoutStore((state) => state.data as CompanyModel);

  // actions
  const handleOnClick = (href: string) => {
    router.push(`/companies/${props.params.company_code}` + href);
  };

  return (
    <CleanContentBox appMenuSize="hidden">
      <PageLayout type="detail" hiddenMenu>
        <Container>
          <PageToolbar title={company.name_th} backFunction={() => router.push("/companies")} />
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
    </CleanContentBox>
  );
}
