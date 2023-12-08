"use client";

import ButtonMenu from "@/components/ButtonMenu";
import { IconFile, IconImport, IconUpload } from "@/components/Icons";
import PageLayout from "@/components/PageLayout";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import FormWizardAction from "@/components/forms/FormWizardAction";
import FormWizardBar from "@/components/forms/FormWizardBar";
import { useDialog } from "@/hooks/useDialog";
import { useWizard } from "@/hooks/useWizard";
import { CreateProjectBoqDTO, CreateProjectBoqItemDTO } from "@/services/graphql/dto/create-project-boq.input";
import { createProjectBoq } from "@/services/graphql/project-boq.service";
import { getProjectForLayoutData } from "@/services/graphql/project.service";
import { ChevronRight } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import FormEstimateCost from "../../../../components/forms/FormEstimateCost";
import FormInfo, { FormInfoFowardRef, FormInfoValues } from "../../../../components/forms/FormInfo";
import FormMaterial from "../../../../components/forms/FormMaterial";
import FormSummary from "../../../../components/forms/FormSummary";
import FormWorkOrder from "../../../../components/forms/FormWorkOrder";
import { useBoqCreateStore } from "../../../../stores/boq-create.store";
import numeral from "numeral";
import { useLayoutStore } from "@/stores/layout.store";

type ProjectBoqCreatePageProps = {
  params: {
    company_code: string;
    project_code: string;
  };
};

export default function ProjectBoqCreatePage(props: ProjectBoqCreatePageProps) {
  // statics
  const router = useRouter();
  const { company_code, project_code } = props.params;

  const { showBackdrop, showToast } = useLayoutStore((state) => ({
    showBackdrop: state.showBackdrop,
    showToast: state.showToast
  }));

  const boqState = useBoqCreateStore((state) => ({
    getMasterData: state.getMasterData,
    loading: state.loading,
    setInfo: state.setInfo,
    info: state.info,
    rootKeys: state.rootKeys,
    itemKeys: state.itemKeys,
    itemByKey: state.itemByKey
  }));

  // query
  const { data: project, isFetched: isFetchedProject } = useQuery({
    queryKey: ["project", project_code],
    queryFn: () => {
      return getProjectForLayoutData(project_code);
    }
  });

  useEffect(() => {
    if (isFetchedProject) {
      boqState.getMasterData(project?.model_types || [], project?.model_sizes || []);
    }
  }, [isFetchedProject]);

  // mutation
  const createBoqMutation = useMutation({
    mutationFn: async (data: CreateProjectBoqDTO) => {
      return createProjectBoq(data);
    }
  });

  // refs
  const formInfoRef = useRef<FormInfoFowardRef>(null);

  // hooks
  const wizard = useWizard({
    steps: [
      "ข้อมูลทั่วไป",
      "ประมาณค่าวัสดุและค่าแรงงาน",
      "วัสดุที่บริษัทจัดซื้อ",
      "วัสดุและค่าแรงงานตัดจ่าย",
      "สรุปต้นทุน"
    ],
    defaultStep: 0
  });

  //
  const dialogConfirm = useDialog({});

  useEffect(() => {
    if (wizard.current === 0) {
      formInfoRef.current?.reset(boqState.info);
    }
  }, [wizard.current]);

  // actions
  const handleOnBack = () => {
    router.push(`/companies/${props.params.company_code}/boq/projects/${props.params.project_code}`);
  };

  const handleOnWizardNext = () => {
    if (wizard.isLast) {
      dialogConfirm.open();
      return;
    }
    //
    if (wizard.current == 0) {
      formInfoRef.current?.submit();
      return;
    }

    wizard.next();
  };

  const handleOnWizardBack = () => {
    //
    wizard.back();
  };

  const handleSaveDraft = () => {
    postCreate("draft");
  };

  const handleSaveApprove = () => {
    postCreate("request");
  };

  const postCreate = async (state: string = "draft") => {
    try {
      //
      const { info, rootKeys, itemKeys, itemByKey } = boqState;
      //
      const total_cost = rootKeys.reduce((total, key) => {
        const item = itemByKey[key];
        if (item != null) {
          return numeral(total).add(item.total).value() || 0;
        }
        return total;
      }, 0);

      const total_area = numeral(info.total_area).value() || 0;
      //
      const data: CreateProjectBoqDTO = {
        running_format_id: info.running_id,
        name: info.name,
        project_id: project?.id || null,
        model_type_id: info.model_type_id == "" ? null : info.model_type_id,
        model_id: info.model_id == "" ? null : info.model_id,
        area_size_id: info.area_size_id == "" ? null : info.area_size_id,
        total_area: total_area,
        total_cost: total_cost,
        average_price: +numeral(total_cost).divide(total_area).format("0.00"),
        ref_master_boq_id: null,
        items: [],
        state: state
      };

      //
      itemKeys.forEach((key) => {
        const item = itemByKey[key];

        if (item.type == "group") {
          data.items.push({
            id: item.id,
            type: item.type,
            name: item.name,
            number: item.number,

            item_id: null,
            item_code: null,

            unit_rate: 0,
            unit_rate_by_owner: false,
            unit_rate_total: item.unit_rate_total,
            owner_unit_total: item.owner_unit_total,

            work_rate: 0,
            work_rate_by_owner: false,
            work_rate_total: item.work_rate_total,
            owner_unit_work_total: item.owner_unit_work_total,
            owner_work_total: item.owner_work_total,

            cost_code: null,
            quantity: 0,
            total: item.total,
            level: item.level,

            parents: item.parents,
            parent_id: item.parent_id,
            childs: [...item.group_childs, ...item.material_childs]
          } as CreateProjectBoqItemDTO);
        } else {
          data.items.push({
            id: item.id,
            type: item.type,
            name: item.name,
            number: item.number,

            item_id: item.item_id,
            item_code: item.item_code,

            unit_rate: numeral(item.unit_rate).value() || 0,
            unit_rate_by_owner: item.unit_rate_by_owner,
            unit_rate_total: numeral(item.unit_rate_total).value() || 0,
            owner_unit_total: numeral(item.owner_unit_total).value() || 0,

            work_rate: numeral(item.work_rate).value() || 0,
            work_rate_by_owner: item.work_rate_by_owner,
            work_rate_total: numeral(item.work_rate_total).value() || 0,
            owner_unit_work_total: numeral(item.owner_unit_work_total).value() || 0,
            owner_work_total: numeral(item.owner_work_total).value() || 0,

            cost_code: item.cost_code,
            quantity: numeral(item.quantity).value() || 0,
            total: numeral(item.total).value() || 0,
            level: 0,

            parents: item.parents,
            parent_id: item.parent_id,
            childs: []
          } as CreateProjectBoqItemDTO);
        }
      });

      //
      await createBoqMutation.mutateAsync(data);

      //
      dialogConfirm.close();
      //
      showToast("success", "บันทึกข้อมุลแล้ว");
      //
      // handleOnBack();
    } catch (error) {
      console.error(error);
    }
  };

  if (isFetchedProject === false || boqState.loading) {
    return null;
  }

  const titleProject = project ? `${project?.code} | ${project?.name_th}` : "loading...";

  return (
    <>
      <PageLayout
        type="detail"
        appMenuSize="small"
        toolbar={{
          title: (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="title_M" color="neutralGray.60">
                {titleProject}
              </Typography>
              <ChevronRight />
              <Typography variant="body_M_B">สร้าง BOQ</Typography>
            </Stack>
          ),
          documentTitle: "สร้าง BOQ",
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

        {wizard.current === 0 && (
          <FormInfo
            ref={formInfoRef}
            onSubmit={(values: FormInfoValues) => {
              //
              boqState.setInfo(values);
              //
              wizard.next();
            }}
          />
        )}
        {wizard.current === 1 && <FormEstimateCost />}
        {wizard.current === 2 && <FormMaterial />}
        {wizard.current === 3 && <FormWorkOrder />}
        {wizard.current === 4 && <FormSummary />}

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
      <ConfirmDialog
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
