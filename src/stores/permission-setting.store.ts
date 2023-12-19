import { DeletePermissionDTO, SetPermissionDTO } from "@/services/graphql/dto/set-permission.input";
import { PermissionEntityModel, PermissionPageModel } from "@/services/graphql/models/permission.model";
import {
  getPageEntities,
  getPageList,
  getPermissionByRefId,
  removePermission,
  setPermission
} from "@/services/graphql/permission.service";
import { create } from "zustand";

interface PermissionSettingStore {
  saving: boolean;
  pages: PermissionPageModel[];
  entities: PermissionEntityModel[];
  permissions: {
    [page_id: string]: string[];
  };
  loadingPages: boolean;
  loadPages: () => Promise<void>;
  loadingEntities: boolean;
  loadEntities: (page_id?: string) => Promise<void>;
  loadingPermissions: boolean;
  loadPermissions: (ref_id: string, ref_type: string, page_id: string | null) => Promise<void>;
  setPermission: (data: SetPermissionDTO) => Promise<void>;
  removePermission: (data: DeletePermissionDTO) => Promise<void>;
}

export const userPermissionSetttingStore = create<PermissionSettingStore>((set, get) => ({
  saving: false,
  pages: [],
  entities: [],
  permissions: {},
  loadingPages: false,
  loadPages: async () => {
    set({ loadingPages: true });
    const pages = await getPageList(null, 0);
    set({ pages: pages, loadingPages: false });
  },
  loadingEntities: false,
  loadEntities: async (page_id?: string) => {
    set({ loadingEntities: true });
    const entities = await getPageEntities(page_id);
    set({ entities: entities, loadingEntities: false });
  },
  loadingPermissions: false,
  loadPermissions: async (ref_id: string, ref_type: string, page_id: string | null) => {
    set({ loadingPermissions: true });

    const permissions = await getPermissionByRefId(ref_id, ref_type, page_id);

    let permissionMap: { [page_id: string]: string[] } = {};

    if (page_id == null) {
      permissions.forEach((item) => {
        if (permissionMap[item.page_id]) {
          permissionMap[item.page_id].push(item.entity_code);
        } else {
          permissionMap[item.page_id] = [item.entity_code];
        }
      });
    } else {
      permissionMap = { ...get().permissions };
      permissionMap[page_id] = permissions.map((item) => item.entity_code);
    }

    set({ loadingPermissions: false, permissions: permissionMap });
  },
  setPermission: async (data: SetPermissionDTO) => {
    set({ saving: true });

    await setPermission(data);
    await get().loadPermissions(data.ref_id, data.ref_type, data.page_id);

    set({ saving: false });
  },
  removePermission: async (data: DeletePermissionDTO) => {
    set({ saving: true });

    await removePermission(data);
    await get().loadPermissions(data.ref_id, data.ref_type, data.page_id);

    set({ saving: false });
  }
}));
