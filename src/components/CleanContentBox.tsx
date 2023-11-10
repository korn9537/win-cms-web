"use client";

import { useModuleLayoutStore } from "@/stores/module-layout.store";
import { BoxProps } from "@mui/material";
import { useEffect } from "react";

type CleanContentBoxProps = {} & BoxProps;

export default function CleanContentBox(props: CleanContentBoxProps) {
  const toggleCleanLayout = useModuleLayoutStore((state) => state.toggleCleanLayout);

  useEffect(() => {
    toggleCleanLayout(true);

    return () => {
      toggleCleanLayout(false);
    };
  }, []);

  return props.children;
}
