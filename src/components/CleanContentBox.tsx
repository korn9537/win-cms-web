// "use client";

// import { MenuSizeType, useLayoutStore } from "@/stores/layout.store";
// import { useModuleLayoutStore } from "@/stores/module-layout.store";
// import { BoxProps } from "@mui/material";
// import { useEffect, useRef } from "react";

// type CleanContentBoxProps = {
//   appMenuSize?: MenuSizeType;
//   moduleMenuSize?: MenuSizeType;
// } & BoxProps;

// export default function CleanContentBox(props: CleanContentBoxProps) {
//   const moduleStore = useModuleLayoutStore((state) => ({
//     toggleCleanLayout: state.toggleCleanLayout,
//     isCleanLayout: state.isCleanLayout,
//     menuSize: state.menuSize,
//     toggleMenuSize: state.toggleMenuSize
//   }));

//   const layoutStore = useLayoutStore((state) => ({
//     menuSize: state.menuSize,
//     toggleMenuSize: state.toggleMenuSize
//   }));

//   const currentAppMenuSize = useRef(layoutStore.menuSize);
//   const currentModuleMenuSize = useRef(moduleStore.menuSize);
//   const currentModuleIsCleanLayout = useRef(moduleStore.isCleanLayout);

//   useEffect(() => {
//     moduleStore.toggleCleanLayout(true);

//     if (props.appMenuSize) {
//       layoutStore.toggleMenuSize(props.appMenuSize);
//     }

//     if (props.moduleMenuSize) {
//       moduleStore.toggleMenuSize(props.moduleMenuSize);
//     }

//     return () => {
//       moduleStore.toggleCleanLayout(currentModuleIsCleanLayout.current);

//       if (props.appMenuSize) {
//         layoutStore.toggleMenuSize(currentAppMenuSize.current);
//       }

//       if (props.moduleMenuSize) {
//         moduleStore.toggleMenuSize(currentModuleMenuSize.current);
//       }
//     };
//   }, []);

//   return props.children;
// }
