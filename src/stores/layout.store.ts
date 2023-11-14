import { MyMenu } from "@/components/layouts/AppMenu";
import { KEY_MENU_LAYOUT_SIZE } from "@/constants/layout.constant";
import { SnackbarOrigin } from "@mui/material";
import Cookies from "js-cookie";
import { create } from "zustand";

type ToastType = "success" | "error" | "warning" | "info";
export type MenuSizeType = "small" | "large" | "hidden";

export type ToastMessage = {
  key: string;
  title: string;
  message: string;
  type: ToastType;
  options: ToastOption;
};

type ToastOption = {
  clear: boolean;
  onClose: () => void;
  duration: number;
  origin: SnackbarOrigin;
};

export interface LayoutState {
  // props
  menus: MyMenu[];
  menuSize: MenuSizeType;
  openedMenus: string[];
  selectedMenu: string;
  toasts: ToastMessage[];
  isShowBackdrop: boolean;

  // actions
  toggleMenuSize: (size?: MenuSizeType) => void;
  toggleMenuOpened: (menu: string) => void;
  selectMenu: (menu: string) => void;
  showToast: (type: ToastType, message?: string, title?: string, options?: ToastOption) => void;
  removeToast: (key?: string) => void;
  showBackdrop: (value?: boolean) => void;
  setMenus: (menus: MyMenu[]) => void;
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
  menus: [],
  menuSize: (Cookies.get(KEY_MENU_LAYOUT_SIZE) as MenuSizeType) || "small",
  openedMenus: [],
  selectedMenu: "",
  toasts: [],
  isShowBackdrop: false,

  toggleMenuSize: (size?: MenuSizeType) => {
    const currentSize = get().menuSize;

    if (currentSize === size) {
      return;
    }

    const value = size ? size : currentSize === "large" ? "small" : "large";

    //
    Cookies.set(KEY_MENU_LAYOUT_SIZE, value);
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

  selectMenu: (menu: string) => {
    // Cookies.set(COOKIE_SELECT_MENU_NAME, menu);
    set({ selectedMenu: menu });
  },

  showToast: (type: ToastType = "success", message?: string, title?: string, options?: ToastOption) => {
    if (title == null) {
      switch (type) {
        case "success":
          title = "สำเร็จ";
          break;
        case "error":
          title = "บันทึกข้อมูลไม่สำเร็จ";
          break;
        default:
          title = "???";
      }
    }

    if (message == null) {
      switch (type) {
        case "success":
          message = "บันทึกข้อมูลสำเร็จ";
          break;
        case "error":
          message = "กรุณาตรวจสอบข้อมูล";
          break;
        default:
          message = "??????";
      }
    }

    let key = new Date().getTime().toString();
    let toast: ToastMessage = {
      key: key,
      title: title,
      message: message,
      type: type,
      options: options || {
        clear: false,
        onClose: () => {
          get().removeToast(key);
        },
        duration: 3000,
        origin: { vertical: "top", horizontal: "right" }
      }
    };

    set((state) => ({ toasts: [...state.toasts, toast] }));
  },
  removeToast: (key?: string) => {
    //
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.key !== key)
    }));
  },

  showBackdrop: (value: boolean = true) => {
    set((state) => ({ isShowBackdrop: value }));
  },

  setMenus: (menus: MyMenu[]) => {
    set({ menus });
  }
}));
