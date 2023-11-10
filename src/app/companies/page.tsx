"use client";

import PageLayout from "@/components/PageLayout";
import AppLayout from "@/components/layouts/AppLayout";
import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ImageCard from "./components/ImageCard";

export default function CompanySelectPage() {
  const router = useRouter();

  // actions
  const handleOnClick = () => {
    router.push(`/company/1/services`);
  };

  return (
    <AppLayout
      requireAuth
      navbarProps={{
        hideModuleSelector: true
      }}
    >
      <PageLayout type="detail">
        <Container>
          <Stack spacing={SPACING_LAYOUT}>
            <Typography variant="title_M" component="div">
              เลือกบริษัท
            </Typography>
            <Box>
              <Grid container spacing={SPACING_LAYOUT}>
                <Grid item xs={4}>
                  <ImageCard
                    src="https://picsum.photos/300/300"
                    title="Helix Company Limited"
                    description="รายละเอียดเพิ่มเติม"
                    onClick={handleOnClick}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ImageCard
                    src="https://picsum.photos/300/300"
                    title="เอ็ม บี เอส พร้อพเพอร์ตี้"
                    description="รายละเอียดเพิ่มเติม"
                    onClick={handleOnClick}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ImageCard
                    src="https://picsum.photos/300/300"
                    title="บริษัท ทำเล จำกัด(มหาชน)"
                    description="รายละเอียดเพิ่มเติม"
                    onClick={handleOnClick}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </PageLayout>
    </AppLayout>
  );
}
