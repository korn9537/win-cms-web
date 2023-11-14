import { MyMenu } from "@/components/layouts/AppMenu";
import { KEY_MENU_MODULE_SIZE } from "@/constants/layout.constant";
import Cookies from "js-cookie";
import { create } from "zustand";
import { MenuSizeType } from "./layout.store";

const COOKIE_SELECT_MENU_NAME = "mbs:win:module-layout:selected-menu";

export interface ModuleLayoutState {
  isCleanLayout: boolean;
  menus: MyMenu[];
  menuSize: MenuSizeType;
  openedMenus: string[];
  selectedMenu: string;
  data: any;
  dataUpdatedAt: number;
  dataQueryKeys: string[];

  // methods
  toggleCleanLayout: (value: boolean) => void;
  toggleMenuSize: (size?: MenuSizeType) => void;
  toggleMenuOpened: (menu: string) => void;
  setSelectMenu: (menu: string) => void;
  setData: (data?: any, dataUpdatedAt?: number, dataQueryKeys?: string[]) => void;
  reset: () => void;
  setMenus: (menus: MyMenu[]) => void;
}

export const useModuleLayoutStore = create<ModuleLayoutState>((set, get) => ({
  isCleanLayout: false,
  menus: [],
  menuSize: (Cookies.get(KEY_MENU_MODULE_SIZE) as MenuSizeType) || "large",
  openedMenus: [],
  selectedMenu: "",
  data: null,
  dataUpdatedAt: 0,
  dataQueryKeys: [],

  toggleCleanLayout: (value: boolean) => {
    set({ isCleanLayout: value });
  },

  toggleMenuSize: (size?: MenuSizeType) => {
    const currentSize = get().menuSize;

    if (currentSize === size) {
      return;
    }

    const value = size ? size : currentSize === "large" ? "small" : "large";
    //
    Cookies.set(KEY_MENU_MODULE_SIZE, value);
    //
    set((state) => ({
      menuSize: value
    }));
  },

  toggleMenuOpened: (menu: string) => {
    const { openedMenus } = get();
    const index = openedMenus.indexOf(menu);
    if (index > -1) {
      openedMenus.splice(index, 1);
    } else {
      openedMenus.push(menu);
    }
    set({ openedMenus });
  },

  setSelectMenu: (menu: string) => {
    // Cookies.set(COOKIE_SELECT_MENU_NAME, menu);
    set({ selectedMenu: menu });
  },

  setData: (data?: any, dataUpdatedAt?: number, dataQueryKeys?: string[]) => {
    set({ data, dataUpdatedAt, dataQueryKeys });
  },

  reset: () => {
    set({
      isCleanLayout: false,
      menuSize: "large",
      openedMenus: [],
      selectedMenu: "",
      data: null
    });
  },

  setMenus: (menus: MyMenu[]) => {
    set({ menus });
  }
}));
