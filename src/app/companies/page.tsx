"use client";

import ButtonAdd from "@/components/ButtonAdd";
import PageLayout from "@/components/PageLayout";
import PageToolbar from "@/components/PageToolbar";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { getCompanies } from "@/services/graphql/companies.service";
import { Box, Container, Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ImageCard from "./components/ImageCard";
import { useModuleLayoutStore } from "@/stores/module-layout.store";
import { useEffect } from "react";
import CleanContentBox from "@/components/CleanContentBox";

export default function CompanySelectPage() {
  // static
  const router = useRouter();
  const moduleStore = useModuleLayoutStore((state) => ({
    reset: state.reset
  }));

  useEffect(() => {
    moduleStore.reset();
  }, []);

  //
  const query = useQuery({
    queryKey: ["companies"],
    queryFn: () => {
      return getCompanies();
    }
  });

  // actions
  const handleOnClick = (code: string) => () => {
    router.push(`/companies/${code}/services`);
  };

  const handleOnClickAdd = () => {
    router.push(`/companies/create`);
  };

  return (
    <CleanContentBox appMenuSize="hidden">
      <PageLayout type="detail">
        <Container>
          <Stack spacing={SPACING_LAYOUT}>
            <PageToolbar
              title="เลือกบริษัท"
              actions={<ButtonAdd text="เพิ่มบริษัท" onClick={handleOnClickAdd} />}
              disableMargin
            />
            <Box>
              <Grid container spacing={SPACING_LAYOUT}>
                {query.data?.map((company) => (
                  <Grid key={company.id} item xs={4}>
                    <ImageCard
                      src={company.logo_image_url}
                      title={company.name_th}
                      description="รายละเอียดเพิ่มเติม"
                      onClick={handleOnClick(company.code)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </PageLayout>
    </CleanContentBox>
  );
}
