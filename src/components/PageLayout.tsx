"use client";

import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { Box, Stack } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import PageFilter, { PageFilterProps } from "./PageFilter";
import PageToolbar, { PageToolbarProps } from "./PageToolbar";
import AppPagination, { AppPaginationProps } from "./layouts/AppPagination";
import { ModuleBreadcrumbItem } from "./layouts/ModuleBreadcrumb";
import { MenuSizeType, useLayoutStore } from "@/stores/layout.store";
import { MyMenu } from "./layouts/AppMenu";
import { useModuleLayoutStore } from "@/stores/module-layout.store";

type PageDetailTookbarProps = Omit<PageToolbarProps, "groupTitle"> & {
  breadcrumb?: ModuleBreadcrumbItem[];
};

type PageLayoutBaseProps = {
  toolbar?: PageToolbarProps | null;
  onBack?: () => void;
  children: React.ReactNode;
  loading?: boolean;

  clean?: boolean;

  appMenuSize?: MenuSizeType;
  moduleMenuSize?: MenuSizeType;

  appMenus?: MyMenu[];
  moduleMenus?: MyMenu[];
};

type PageListLayoutProps = PageLayoutBaseProps & {
  type: "list";
  filter?: PageFilterProps | React.ReactNode;
  pagination?: AppPaginationProps;
};

type PageDetailLayoutProps = PageLayoutBaseProps & {
  type: "detail";
};

export type PageLayoutProps = PageListLayoutProps | PageDetailLayoutProps;

function isPageFilterProps(obj: any): obj is PageFilterProps {
  return "children" in obj;
}

export default function PageLayout(props: PageLayoutProps) {
  // statics
  const moduleStore = useModuleLayoutStore((state) => ({
    toggleCleanLayout: state.toggleCleanLayout,
    isCleanLayout: state.isCleanLayout,
    menuSize: state.menuSize,
    toggleMenuSize: state.toggleMenuSize,
    setMenus: state.setMenus
  }));

  const layoutStore = useLayoutStore((state) => ({
    menuSize: state.menuSize,
    toggleMenuSize: state.toggleMenuSize,
    setMenus: state.setMenus
  }));

  const currentAppMenuSize = useRef(layoutStore.menuSize);
  const currentModuleMenuSize = useRef(moduleStore.menuSize);
  const currentModuleIsCleanLayout = useRef(moduleStore.isCleanLayout);

  // states
  const [contentScrollTop, setContentScrollTop] = useState(0);

  // refs
  const contentRef = React.useRef<HTMLDivElement>(null);

  // bind onScroll event
  useEffect(() => {
    const handleScroll = _.debounce((event: any) => {
      const scrollTop = event.target.scrollTop;
      setContentScrollTop(scrollTop);
    }, 50);

    if (contentRef.current && props.toolbar?.sticky) {
      contentRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentRef.current && props.toolbar?.sticky) {
        contentRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [contentRef.current]);

  // layout
  useEffect(() => {
    if (props.appMenus) {
      layoutStore.setMenus(props.appMenus);
    }

    if (props.moduleMenus) {
      console.log("set module menus", props.moduleMenus, props.moduleMenuSize);

      moduleStore.setMenus(props.moduleMenus);
    }

    if (props.clean) {
      moduleStore.toggleCleanLayout(props.clean);
    }

    if (props.appMenuSize) {
      layoutStore.toggleMenuSize(props.appMenuSize);
    }

    if (props.moduleMenuSize) {
      moduleStore.toggleMenuSize(props.moduleMenuSize);
    }

    return () => {
      if (props.clean) {
        moduleStore.toggleCleanLayout(currentModuleIsCleanLayout.current);
      }

      if (props.appMenuSize) {
        layoutStore.toggleMenuSize(currentAppMenuSize.current);
      }

      if (props.moduleMenuSize) {
        moduleStore.toggleMenuSize(currentModuleMenuSize.current);
      }
    };
  }, []);

  // actions

  // render detail
  // const asideVisible = true;
  // const hasBreadcrumb = (props.toolbar?.breadcrumb && props.toolbar?.breadcrumb.length > 0) || false;

  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        position: "relative"
      }}
    >
      <Box
        ref={contentRef}
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          overflow: "auto",
          p: props.toolbar?.sticky ? 0 : SPACING_LAYOUT
        }}
      >
        {props.toolbar && (
          <PageToolbar
            {...props.toolbar}
            backFunction={props.toolbar?.backFunction || props.onBack}
            dropShadow={props.toolbar.sticky && contentScrollTop > 32}
          />
        )}
        <Stack
          spacing={SPACING_LAYOUT}
          p={props.toolbar?.sticky ? SPACING_LAYOUT : 0}
          pt={props.toolbar?.sticky ? 1 : 0}
        >
          {/* {props.toolbar && (
            <PageToolbar {...props.toolbar} backFunction={props.toolbar?.backFunction || props.onBack} />
          )} */}

          {props.type == "list" ? (
            <>
              {/* Filter */}
              {props.filter && (
                <>
                  {isPageFilterProps(props.filter) ? (
                    <PageFilter {...(props.filter as PageFilterProps)} />
                  ) : (
                    <PageFilter>{props.filter as React.ReactNode}</PageFilter>
                  )}
                </>
              )}

              {/* Pagination Top */}
              {props.pagination ? (
                <AppPagination {...props.pagination} loading={props.loading}>
                  {props.children}
                </AppPagination>
              ) : (
                props.children
              )}
            </>
          ) : (
            props.children
          )}
        </Stack>
      </Box>
    </Box>
  );
}

// "use client";

// import { SPACING_LAYOUT } from "@/constants/layout.constant";
// import { Box, Stack } from "@mui/material";
// import _ from "lodash";
// import React, { useEffect, useState } from "react";
// import PageFilter, { PageFilterProps } from "./PageFilter";
// import PageToolbar, { PageToolbarProps } from "./PageToolbar";
// import AppPagination, { AppPaginationProps } from "./layouts/AppPagination";
// import { ModuleBreadcrumbItem } from "./layouts/ModuleBreadcrumb";
// import { useLayoutStore } from "@/stores/layout.store";

// type PageDetailTookbarProps = Omit<PageToolbarProps, "groupTitle"> & {
//   breadcrumb?: ModuleBreadcrumbItem[];
// };

// type PageListLayoutProps = {
//   type: "list";
//   toolbar?: PageToolbarProps | null;
//   onBack?: () => void;
//   children: React.ReactNode;
//   loading?: boolean;
//   //
//   filter?: PageFilterProps | React.ReactNode;
//   pagination?: AppPaginationProps;
//   hiddenMenu?: boolean;
// };

// type PageDetailLayoutProps = {
//   type: "detail";
//   toolbar?: PageDetailTookbarProps | null;
//   onBack?: () => void;
//   children: React.ReactNode;
//   loading?: boolean;
//   hiddenMenu?: boolean;
// };

// export type PageLayoutProps = PageListLayoutProps | PageDetailLayoutProps;

// function isPageFilterProps(obj: any): obj is PageFilterProps {
//   return "children" in obj;
// }

// export default function PageLayout(props: PageLayoutProps) {
//   // statics
//   // const toggleMenuSize = useLayoutStore((state) => state.toggleMenuSize);

//   // states
//   const [contentScrollTop, setContentScrollTop] = useState(0);

//   // refs
//   const contentRef = React.useRef<HTMLDivElement>(null);

//   // bind onScroll event
//   useEffect(() => {
//     const handleScroll = _.debounce((event: any) => {
//       const scrollTop = event.target.scrollTop;
//       setContentScrollTop(scrollTop);
//     }, 50);

//     if (contentRef.current && props.toolbar?.sticky) {
//       contentRef.current.addEventListener("scroll", handleScroll);
//     }

//     return () => {
//       if (contentRef.current && props.toolbar?.sticky) {
//         contentRef.current.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, [contentRef.current]);

//   // useEffect(() => {
//   //   if (props.hiddenMenu) {
//   //     toggleMenuSize("hidden");
//   //   }

//   //   return () => {
//   //     if (props.hiddenMenu) {
//   //       toggleMenuSize("large");
//   //     }
//   //   };
//   // }, [props.hiddenMenu]);

//   // actions

//   // render detail
//   // const asideVisible = true;
//   // const hasBreadcrumb = (props.toolbar?.breadcrumb && props.toolbar?.breadcrumb.length > 0) || false;

//   return (
//     <Box
//       sx={{
//         flex: 1,
//         height: "100%",
//         position: "relative"
//       }}
//     >
//       <Box
//         ref={contentRef}
//         sx={{
//           position: "absolute",
//           height: "100%",
//           width: "100%",
//           overflow: "auto",
//           p: props.toolbar?.sticky ? 0 : SPACING_LAYOUT
//         }}
//       >
//         {props.toolbar && (
//           <PageToolbar
//             {...props.toolbar}
//             backFunction={props.toolbar?.backFunction || props.onBack}
//             dropShadow={props.toolbar.sticky && contentScrollTop > 32}
//           />
//         )}
//         <Stack
//           spacing={SPACING_LAYOUT}
//           p={props.toolbar?.sticky ? SPACING_LAYOUT : 0}
//           pt={props.toolbar?.sticky ? 1 : 0}
//         >
//           {/* {props.toolbar && (
//             <PageToolbar {...props.toolbar} backFunction={props.toolbar?.backFunction || props.onBack} />
//           )} */}

//           {props.type == "list" ? (
//             <>
//               {/* Filter */}
//               {props.filter && (
//                 <>
//                   {isPageFilterProps(props.filter) ? (
//                     <PageFilter {...(props.filter as PageFilterProps)} />
//                   ) : (
//                     <PageFilter>{props.filter as React.ReactNode}</PageFilter>
//                   )}
//                 </>
//               )}

//               {/* Pagination Top */}
//               {props.pagination ? (
//                 <AppPagination {...props.pagination} loading={props.loading}>
//                   {props.children}
//                 </AppPagination>
//               ) : (
//                 props.children
//               )}
//             </>
//           ) : (
//             props.children
//           )}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }
