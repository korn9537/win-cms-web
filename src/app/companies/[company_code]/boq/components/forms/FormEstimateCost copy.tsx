// import ButtonAdd from "@/components/ButtonAdd";
// import EmptyDataPanel from "@/components/EmptyDataPanel";
// import { IconDelete, IconEdit } from "@/components/Icons";
// import FormContainer, { FormContainerProps } from "@/components/forms/FormContainer";
// import { SPACING_FORM } from "@/constants/layout.constant";
// import { useDialog } from "@/hooks/useDialog";
// import {
//   Box,
//   Chip,
//   IconButton,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography
// } from "@mui/material";
// import { BoqItemGroup, BoqItemMaterial, useBoqCreateStore } from "../../stores/boq-create.store";
// import { CollapseCard } from "../CollapseCard";
// import { CollapseGroup } from "../CollapseGroup";
// import BoqItemDialog from "../dialogs/BoqItemDialog";
// import { getMasterItemUnits, getMasterItems } from "@/services/graphql/masters/master-item.service";
// import { useQuery } from "@tanstack/react-query";
// // import { getCostCodes } from "@/services/graphql/masters/costcode.service";

// export const defaultFormEstimateCostValues: FormEstimateCostValues = {};

// export type FormEstimateCostValues = {};

// type FormEstimateCostProps = {
//   disabled?: boolean;
// } & FormContainerProps;

// export default function FormEstimateCost({
//   title = "รายการประมาณค่าวัสดุและค่าแรงงาน",
//   disabled = false,
//   ...props
// }: FormEstimateCostProps) {
//   // statics
//   const items = useBoqCreateStore((state) => state.itemKeys);

//   const dialogAdd = useDialog({
//     onConfirm(data, dialog, res) {
//       // console.log(data);
//       dialog.close();
//     },
//     onCancel(data, dialog) {}
//   });

//   console.log(items);

//   // actions
//   const handleClickAdd = (levelType: "child" | "same", parentId: string | null, itemType?: "group" | "material") => {
//     dialogAdd.open(null, null, {
//       levelType,
//       parentId,
//       itemType
//     });
//   };

//   // render

//   let content = null;

//   if (items.length == 0) {
//     content = <EmptyDataPanel onClick={() => handleClickAdd("child", null)} />;
//   } else {
//     // content = (
//     //   <CollapseGroup spacing={SPACING_FORM}>
//     //     <CollapseCard
//     //       title="1 หมวดงานโครงสร้าง"
//     //       sx={{
//     //         "& .card-action": {
//     //           display: "none"
//     //         },
//     //         "&:hover": {
//     //           ".card-action": {
//     //             display: "inherit"
//     //           },
//     //           ".card-action-hidden": {
//     //             display: "none"
//     //           }
//     //         }
//     //       }}
//     //       action={
//     //         <Stack direction="row" alignItems="center" spacing={2.5}>
//     //           <Box className="card-action">
//     //             <Stack direction="row" alignItems="center" spacing={2.5}>
//     //               <ButtonAdd text="ระดับเดียวกัน" variant="outlined" size="small" />
//     //               <ButtonAdd text="ระดับย่อย" variant="outlined" size="small" />
//     //               <IconButton size="small" color="black80">
//     //                 <IconEdit />
//     //               </IconButton>
//     //               <IconButton size="small" color="black80">
//     //                 <IconDelete />
//     //               </IconButton>
//     //             </Stack>
//     //           </Box>
//     //           <Typography variant="body_M_B" className="card-action-hidden">
//     //             57,500.75
//     //           </Typography>
//     //         </Stack>
//     //       }
//     //       open
//     //       titleProps={{
//     //         sx: {
//     //           bgcolor: "#F5F6F8",
//     //           borderBottom: "1px solid",
//     //           borderColor: "neutralGray.20"
//     //         }
//     //       }}
//     //       bodyProps={{
//     //         sx: {
//     //           bgcolor: "neutralGray.10"
//     //         }
//     //       }}
//     //     >
//     //       <CollapseGroup>
//     //         <CollapseCard
//     //           title="1.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//     //           action={<Typography variant="body_M_B">57,500.75</Typography>}
//     //           titleProps={{
//     //             sx: {
//     //               bgcolor: "neutralGray.20",
//     //               borderBottom: "1px solid",
//     //               borderColor: "neutralGray.10"
//     //             }
//     //           }}
//     //           bodyProps={{
//     //             sx: {
//     //               bgcolor: "#fff"
//     //             }
//     //           }}
//     //           open
//     //           disabledPadding
//     //         >
//     //           <TableExample />
//     //           <CollapseGroup spacing={SPACING_FORM} p={2}>
//     //             <CollapseCard
//     //               title="1.1.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//     //               action={<Typography variant="body_M_B">57,500.75</Typography>}
//     //               titleProps={{
//     //                 sx: {
//     //                   bgcolor: "neutralGray.20",
//     //                   borderBottom: "1px solid",
//     //                   borderColor: "neutralGray.10"
//     //                 }
//     //               }}
//     //               bodyProps={{
//     //                 sx: {
//     //                   bgcolor: "#fff"
//     //                 }
//     //               }}
//     //               open
//     //               bordered
//     //               disabledPadding
//     //             >
//     //               <TableExample />
//     //               <CollapseGroup spacing={SPACING_FORM} p={2}>
//     //                 <CollapseCard
//     //                   title="1.1.1.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//     //                   action={<Typography variant="body_M_B">57,500.75</Typography>}
//     //                   titleProps={{
//     //                     sx: {
//     //                       bgcolor: "neutralGray.20",
//     //                       borderBottom: "1px solid",
//     //                       borderColor: "neutralGray.10"
//     //                     }
//     //                   }}
//     //                   bodyProps={{
//     //                     sx: {
//     //                       bgcolor: "#fff"
//     //                     }
//     //                   }}
//     //                   open
//     //                   bordered
//     //                   disabledPadding
//     //                 >
//     //                   <TableExample />
//     //                 </CollapseCard>
//     //               </CollapseGroup>
//     //             </CollapseCard>
//     //           </CollapseGroup>
//     //         </CollapseCard>
//     //         <CollapseCard
//     //           title="1.2 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//     //           action={<Typography variant="body_M_B">57,500.75</Typography>}
//     //           titleProps={{
//     //             sx: {
//     //               bgcolor: "neutralGray.20",
//     //               borderBottom: "1px solid",
//     //               borderColor: "neutralGray.10"
//     //             }
//     //           }}
//     //           bodyProps={{
//     //             sx: {
//     //               bgcolor: "#fff"
//     //             }
//     //           }}
//     //           open
//     //           disabledPadding
//     //         >
//     //           <TableExample />
//     //           <CollapseGroup spacing={SPACING_FORM} p={2}>
//     //             <CollapseCard
//     //               title="1.2.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//     //               action={<Typography variant="body_M_B">57,500.75</Typography>}
//     //               titleProps={{
//     //                 sx: {
//     //                   bgcolor: "neutralGray.20",
//     //                   borderBottom: "1px solid",
//     //                   borderColor: "neutralGray.10"
//     //                 }
//     //               }}
//     //               bodyProps={{
//     //                 sx: {
//     //                   bgcolor: "#fff"
//     //                 }
//     //               }}
//     //               open
//     //               bordered
//     //               disabledPadding
//     //             >
//     //               <TableExample />
//     //             </CollapseCard>
//     //           </CollapseGroup>
//     //         </CollapseCard>
//     //       </CollapseGroup>
//     //     </CollapseCard>
//     //   </CollapseGroup>
//     // );
//   }

//   return (
//     <>
//       <FormContainer title={title} {...props}>
//         {content}
//       </FormContainer>
//       {/* Dialogs */}
//       <BoqItemDialog {...dialogAdd.dialogProps} title="เพิ่มข้อมูลรายการประมาณค่าวัสดุและแรงงาน" />
//     </>
//   );
// }

// function TableExample() {
//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>ชื่อหัวข้อ</TableCell>
//           <TableCell align="right">จำนวน</TableCell>
//           <TableCell>หน่วย</TableCell>
//           <TableCell align="right">{`ราคาวัสดุ/หน่วย (บาท)`}</TableCell>
//           <TableCell align="right">รวมราคาวัสดุ</TableCell>
//           <TableCell align="right">{`ค่าแรง/หน่วย (บาท)`}</TableCell>
//           <TableCell align="right">รวมค่าแรง</TableCell>
//           <TableCell align="right">{`รวมทั้งสิ้น (บาท)`}</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         <TableRow>
//           <TableCell>ตัดหัวเสาเข็ม I-0.22x0.22 m.</TableCell>
//           <TableCell align="right">16.00</TableCell>
//           <TableCell>ต้น</TableCell>
//           <TableCell align="right">
//             <Chip label="40.00" size="small" color="success" />
//           </TableCell>
//           <TableCell align="right">640.00</TableCell>
//           <TableCell align="right">150.00</TableCell>
//           <TableCell align="right">2,400.00</TableCell>
//           <TableCell align="right">3,040.00</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell>งานวางผังบ้าน</TableCell>
//           <TableCell align="right">1.00</TableCell>
//           <TableCell>เหมา</TableCell>
//           <TableCell align="right"></TableCell>
//           <TableCell align="right"></TableCell>
//           <TableCell align="right">2,500.00</TableCell>
//           <TableCell align="right">2,500.00</TableCell>
//           <TableCell align="right">2,500.00</TableCell>
//         </TableRow>
//       </TableBody>
//     </Table>
//   );
// }

// function BoqCollapseCard({ itemId }: { itemId: string }) {
//   const item = useBoqCreateStore((state) => state.items.find((item) => item.id === itemId));

//   if (item == null) {
//     return null;
//   }

//   if (item.type === "group") {
//   }

//   return (
//     <CollapseCard
//       title={item?.name}
//       sx={{
//         "& .card-action": {
//           display: "none"
//         },
//         "&:hover": {
//           ".card-action": {
//             display: "inherit"
//           },
//           ".card-action-hidden": {
//             display: "none"
//           }
//         }
//       }}
//       action={
//         <Stack direction="row" alignItems="center" spacing={2.5}>
//           <Box className="card-action">
//             <Stack direction="row" alignItems="center" spacing={2.5}>
//               <ButtonAdd text="ระดับเดียวกัน" variant="outlined" size="small" />
//               <ButtonAdd text="ระดับย่อย" variant="outlined" size="small" />
//               <IconButton size="small" color="black80">
//                 <IconEdit />
//               </IconButton>
//               <IconButton size="small" color="black80">
//                 <IconDelete />
//               </IconButton>
//             </Stack>
//           </Box>
//           <Typography variant="body_M_B" className="card-action-hidden">
//             57,500.75
//           </Typography>
//         </Stack>
//       }
//       open
//       titleProps={{
//         sx: {
//           bgcolor: "#F5F6F8",
//           borderBottom: "1px solid",
//           borderColor: "neutralGray.20"
//         }
//       }}
//       bodyProps={{
//         sx: {
//           bgcolor: "neutralGray.10"
//         }
//       }}
//     >
//       <CollapseGroup>
//         <CollapseCard
//           title="1.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//           action={<Typography variant="body_M_B">57,500.75</Typography>}
//           titleProps={{
//             sx: {
//               bgcolor: "neutralGray.20",
//               borderBottom: "1px solid",
//               borderColor: "neutralGray.10"
//             }
//           }}
//           bodyProps={{
//             sx: {
//               bgcolor: "#fff"
//             }
//           }}
//           open
//           disabledPadding
//         >
//           <TableExample />
//           <CollapseGroup spacing={SPACING_FORM} p={2}>
//             <CollapseCard
//               title="1.1.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//               action={<Typography variant="body_M_B">57,500.75</Typography>}
//               titleProps={{
//                 sx: {
//                   bgcolor: "neutralGray.20",
//                   borderBottom: "1px solid",
//                   borderColor: "neutralGray.10"
//                 }
//               }}
//               bodyProps={{
//                 sx: {
//                   bgcolor: "#fff"
//                 }
//               }}
//               open
//               bordered
//               disabledPadding
//             >
//               <TableExample />
//               <CollapseGroup spacing={SPACING_FORM} p={2}>
//                 <CollapseCard
//                   title="1.1.1.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//                   action={<Typography variant="body_M_B">57,500.75</Typography>}
//                   titleProps={{
//                     sx: {
//                       bgcolor: "neutralGray.20",
//                       borderBottom: "1px solid",
//                       borderColor: "neutralGray.10"
//                     }
//                   }}
//                   bodyProps={{
//                     sx: {
//                       bgcolor: "#fff"
//                     }
//                   }}
//                   open
//                   bordered
//                   disabledPadding
//                 >
//                   <TableExample />
//                 </CollapseCard>
//               </CollapseGroup>
//             </CollapseCard>
//           </CollapseGroup>
//         </CollapseCard>
//         <CollapseCard
//           title="1.2 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//           action={<Typography variant="body_M_B">57,500.75</Typography>}
//           titleProps={{
//             sx: {
//               bgcolor: "neutralGray.20",
//               borderBottom: "1px solid",
//               borderColor: "neutralGray.10"
//             }
//           }}
//           bodyProps={{
//             sx: {
//               bgcolor: "#fff"
//             }
//           }}
//           open
//           disabledPadding
//         >
//           <TableExample />
//           <CollapseGroup spacing={SPACING_FORM} p={2}>
//             <CollapseCard
//               title="1.2.1 งานโครงสร้างคอนกรีตเสริมเหล็ก"
//               action={<Typography variant="body_M_B">57,500.75</Typography>}
//               titleProps={{
//                 sx: {
//                   bgcolor: "neutralGray.20",
//                   borderBottom: "1px solid",
//                   borderColor: "neutralGray.10"
//                 }
//               }}
//               bodyProps={{
//                 sx: {
//                   bgcolor: "#fff"
//                 }
//               }}
//               open
//               bordered
//               disabledPadding
//             >
//               <TableExample />
//             </CollapseCard>
//           </CollapseGroup>
//         </CollapseCard>
//       </CollapseGroup>
//     </CollapseCard>
//   );
// }
