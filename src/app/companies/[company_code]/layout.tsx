"use client";

import { getCompanyForLayoutData } from "@/services/graphql/companies.service";
import { useLayoutStore } from "@/stores/layout.store";
import { useModuleLayoutStore } from "@/stores/module-layout.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MODULE_MENUS } from "../layout";
import _ from "lodash";

export default function Layout(props: {
  children: React.ReactNode;
  params: {
    company_code: string;
  };
}) {
  // statics
  const { company_code } = props.params;

  const layoutStore = useLayoutStore((state) => ({
    setMenus: state.setMenus
  }));

  const moduleStore = useModuleLayoutStore((state) => ({
    data: state.data,
    setData: state.setData
  }));

  // query
  const query = useQuery({
    queryKey: ["company-layout", company_code],
    queryFn: () => {
      return getCompanyForLayoutData(company_code);
    }
  });

  useEffect(() => {
    if (query.isFetched) {
      moduleStore.setData(query.data);
      layoutStore.setMenus(
        MODULE_MENUS.map((menu) => ({ ..._.omit(menu, ["subMenus"]), href: `/companies/${company_code}` + menu.href }))
      );
    }
  }, [query.isFetched]);

  // menu management

  // render
  if (query.isLoading || moduleStore.data === null) {
    return <div>loading...</div>;
  }

  return props.children;
}
