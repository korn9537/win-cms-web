import { create } from "zustand";

export interface BoqItem {
  id: string;
  type: string;

  parent_id: string;
  childs: string[];
  level: number;

  name: string;
  quantity: number;
  unit: string;
  unit_rate: number;
  unit_total: number;

  work_rate: number;
  work_total: number;

  total: number;

  //
  item_code: string;
  cost_code: string;
}

interface IBoqCreateStore {
  items: BoqItem[];

  addItem: (item: BoqItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: BoqItem) => void;
}

export const useBoqCreateStore = create<IBoqCreateStore>((set) => ({
  items: [],

  addItem: (item: BoqItem) => {
    set((state) => ({
      items: [...state.items, item]
    }));
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    }));
  },

  updateItem: (id: string, item: BoqItem) => {
    set((state) => ({
      items: state.items.map((prev) => (prev.id === id ? item : prev))
    }));
  }
}));
