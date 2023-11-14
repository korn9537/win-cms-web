"use client";

import { IconFile, IconImport, IconUpload } from "@/components/Icons";
import PageLayout from "@/components/PageLayout";
import FormWizardAction from "@/components/forms/FormWizardAction";
import FormWizardBar from "@/components/forms/FormWizardBar";
import { useDialog } from "@/hooks/useDialog";
import { useWizard } from "@/hooks/useWizard";
import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import FormEstimateCost from "../../../components/forms/FormEstimateCost";
import FormInfo from "../../../components/forms/FormInfo";
import FormMaterial from "../../../components/forms/FormMaterial";
import FormSummary from "../../../components/forms/FormSummary";
import FormWorkOrder from "../../../components/forms/FormWorkOrder";
import ComfirmDialog from "@/components/dialogs/ComfirmDialog";
import ButtonMenu from "@/components/ButtonMenu";

type ProjectBoqCreatePageProps = {
  params: {
    company_code: string;
    project_code: string;
  };
};

export default function ProjectBoqCreatePage(props: ProjectBoqCreatePageProps) {
  // statics
  const router = useRouter();

  // hooks
  const wizard = useWizard({
    steps: [
      "ข้อมูลทั่วไป",
      "ประมาณค่าวัสดุและค่าแรงงาน",
      "วัสดุที่บริษัทจัดซื้อ",
      "วัสดุและค่าแรงงานตัดจ่าย",
      "สรุปต้นทุน"
    ]
  });

  //
  const dialogConfirm = useDialog({});

  // actions
  const handleOnBack = () => {
    router.push(`/company/${props.params.company_code}/boq/projects/${props.params.project_code}`);
  };

  const handleOnWizardNext = () => {
    if (wizard.isLast) {
      dialogConfirm.open();
      return;
    }
    //
    wizard.next();
  };
  const handleOnWizardBack = () => {
    //
    wizard.back();
  };

  const handleSaveDraft = () => {
    dialogConfirm.close();
    handleOnBack();
  };

  const handleSaveApprove = () => {
    dialogConfirm.close();
    handleOnBack();
  };

  return (
    <>
      <PageLayout
        type="detail"
        toolbar={{
          title: (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="title_M" color="neutralGray.60">
                WIN | วิน บางกอก1
              </Typography>
              <ChevronRight />
              <Typography variant="body_M_B">สร้าง BOQ</Typography>
            </Stack>
          ),
          actions: (
            <Stack direction="row" spacing={2.5}>
              {wizard.current === 0 && (
                <>
                  <ButtonMenu
                    menus={[
                      {
                        text: "นำเข้าข้อมูลจาก Template",
                        icon: <IconFile />,
                        onClick: () => {}
                      },
                      {
                        text: "นำเข้าข้อมูลจาก BOQ Master",
                        icon: <IconImport />,
                        onClick: () => {}
                      }
                    ]}
                    startIcon={<IconImport />}
                  >
                    นำเข้าข้อมูล
                  </ButtonMenu>
                  <ButtonMenu
                    menus={[
                      {
                        text: "นำออก Template",
                        icon: <IconUpload />,
                        onClick: () => {}
                      }
                    ]}
                    startIcon={<IconUpload />}
                  >
                    นำออกข้อมูล
                  </ButtonMenu>
                </>
              )}
            </Stack>
          )
          // sticky: true
        }}
        onBack={handleOnBack}
      >
        {/* Wizard */}
        <FormWizardBar
          current={wizard.current}
          total={wizard.total}
          steps={wizard.steps}
          onClick={(step) => wizard.setStep(step)}
          showNumber
        />

        {/* Forms  */}
        <Box
          sx={{
            display: wizard.current === 0 ? "block" : "none"
          }}
        >
          <FormInfo />
        </Box>

        <Box
          sx={{
            display: wizard.current === 1 ? "block" : "none"
          }}
        >
          <FormEstimateCost />
        </Box>

        <Box
          sx={{
            display: wizard.current === 2 ? "block" : "none"
          }}
        >
          <FormMaterial />
        </Box>

        <Box
          sx={{
            display: wizard.current === 3 ? "block" : "none"
          }}
        >
          <FormWorkOrder />
        </Box>

        <Box
          sx={{
            display: wizard.current === 4 ? "block" : "none"
          }}
        >
          <FormSummary />
        </Box>

        {/*  */}
        <FormWizardAction
          current={wizard.current}
          total={wizard.total}
          disabledNext={false}
          onClickNext={handleOnWizardNext}
          onClickBack={handleOnWizardBack}
        />
      </PageLayout>

      {/* Dialogs */}
      <ComfirmDialog
        {...dialogConfirm.dialogProps}
        title="ต้องการบันทึกข้อมูลเพื่อรอการอนุมัติใช่หรือไม่"
        content="หากไม่ต้องการส่งอนุมัติทันที ให้บันทึกข้อมูลเป็นแบบร่าง"
        action={
          <>
            <Button onClick={handleSaveDraft} variant="outlined" color="black80">
              บันทึกข้อมูลเป็นแบบร่าง
            </Button>
            <Button onClick={handleSaveApprove} variant="contained" color="primary">
              ส่งอนุมัติ
            </Button>
          </>
        }
      />
    </>
  );
}
