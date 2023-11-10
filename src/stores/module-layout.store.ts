import { KEY_MENU_MODULE_SIZE } from '@/constants/layout.constant';
import { ICompanyDetail } from '@/interfaces/company-detail.interface';
import { IProjectDetail } from '@/interfaces/project-interface-detail';
import { IUnitSaleOrder } from '@/interfaces/unit.interface';
import Cookies from 'js-cookie';
import { create } from 'zustand';

const COOKIE_SELECT_MENU_NAME = 'mbs:win:module-layout:selected-menu';

type MenuSizeType = 'small' | 'large';

export interface ModuleLayoutState {
  isCleanLayout: boolean;
  menuSize: MenuSizeType;
  openedMenus: string[];
  selectedMenu: string;
  data: ICompanyDetail | IProjectDetail | IUnitSaleOrder | null;
  dataUpdatedAt: number;
  dataQueryKeys: string[];

  // methods
  toggleCleanLayout: (value: boolean) => void;
  toggleMenuSize: () => void;
  toggleMenuOpened: (menu: string) => void;
  setSelectMenu: (menu: string) => void;
  setData: (
    data?: ICompanyDetail | IProjectDetail | IUnitSaleOrder | any | null,
    dataUpdatedAt?: number,
    dataQueryKeys?: string[],
  ) => void;
  reset: () => void;
}

export const useModuleLayoutStore = create<ModuleLayoutState>((set, get) => ({
  isCleanLayout: false,
  menuSize: (Cookies.get(KEY_MENU_MODULE_SIZE) as MenuSizeType) || 'large',
  openedMenus: [],
  selectedMenu: '',
  data: null,
  dataUpdatedAt: 0,
  dataQueryKeys: [],

  toggleCleanLayout: (value: boolean) => {
    set({ isCleanLayout: value });
  },

  toggleMenuSize: () => {
    const value = get().menuSize === 'large' ? 'small' : 'large';
    //
    Cookies.set(KEY_MENU_MODULE_SIZE, value);
    //
    set((state) => ({
      menuSize: value,
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

  setData: (data?: ICompanyDetail | IProjectDetail | any | null, dataUpdatedAt?: number, dataQueryKeys?: string[]) => {
    set({ data, dataUpdatedAt, dataQueryKeys });
  },

  reset: () => {
    set({
      isCleanLayout: false,
      menuSize: 'large',
      openedMenus: [],
      selectedMenu: '',
      data: null,
    });
  },
}));
