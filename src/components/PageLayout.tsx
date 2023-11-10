"use client";

import { SPACING_LAYOUT } from "@/constants/layout.constant";
import { Box, Stack } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import PageFilter, { PageFilterProps } from "./PageFilter";
import PageToolbar, { PageToolbarProps } from "./PageToolbar";
import AppPagination, { AppPaginationProps } from "./layouts/AppPagination";
import { ModuleBreadcrumbItem } from "./layouts/ModuleBreadcrumb";
import { useLayoutStore } from "@/stores/layout.store";

type PageDetailTookbarProps = Omit<PageToolbarProps, "groupTitle"> & {
  breadcrumb?: ModuleBreadcrumbItem[];
};

type PageListLayoutProps = {
  type: "list";
  toolbar?: PageToolbarProps | null;
  onBack?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  //
  filter?: PageFilterProps | React.ReactNode;
  pagination?: AppPaginationProps;
  hiddenMenu?: boolean;
};

type PageDetailLayoutProps = {
  type: "detail";
  toolbar?: PageDetailTookbarProps | null;
  onBack?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  hiddenMenu?: boolean;
};

export type PageLayoutProps = PageListLayoutProps | PageDetailLayoutProps;

function isPageFilterProps(obj: any): obj is PageFilterProps {
  return "children" in obj;
}

export default function PageLayout(props: PageLayoutProps) {
  // statics
  const toggleMenuSize = useLayoutStore((state) => state.toggleMenuSize);

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

  useEffect(() => {
    if (props.hiddenMenu) {
      toggleMenuSize("hidden");
    }

    return () => {
      if (props.hiddenMenu) {
        toggleMenuSize("large");
      }
    };
  }, [props.hiddenMenu]);

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
