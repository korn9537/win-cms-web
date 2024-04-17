import { getCompanies } from "@/services/graphql/company.service";
import { DeletePermissionDTO, SetPermissionDTO } from "@/services/graphql/dto/set-permission.input";
import { CompanyModel } from "@/services/graphql/models/company.model";
import { PermissionEntityModel, PermissionPageModel } from "@/services/graphql/models/permission.model";
import { ProjectModel } from "@/services/graphql/models/project.model";
import {
  getPageEntities,
  getPageList,
  getPermissionByRefId,
  removePermission,
  setPermission
} from "@/services/graphql/permission.service";
import { getProjects } from "@/services/graphql/project.service";
import { create } from "zustand";

interface PermissionSettingStore {
  saving: boolean;

  // page
  pages: PermissionPageModel[];
  loadingPages: boolean;
  loadPages: () => Promise<void>;

  // entity
  entities: PermissionEntityModel[];
  loadingEntities: boolean;
  loadEntities: (page_id?: string) => Promise<void>;

  // permission
  permissions: {
    [page_id: string]: string[];
  };
  parentPermissions: {
    [page_id: string]: string[];
  };
  loadingPermissions: boolean;
  loadPermissions: (ref_id: string, ref_type: string, page_id: string | null) => Promise<void>;
  setPermission: (data: SetPermissionDTO) => Promise<void>;
  removePermission: (data: DeletePermissionDTO) => Promise<void>;

  // company
  companies: CompanyModel[];
  selectedCompany: string[];
  parentSelectedCompany: string[];
  loadingCompanies: boolean;
  loadCompanies: () => Promise<void>;

  // project
  projects: ProjectModel[];
  selectedProject: string[];
  parentSelectedProject: string[];
  loadingProjects: boolean;
  loadProjects: (companyId: string) => Promise<void>;
}

export const userPermissionSettingStore = create<PermissionSettingStore>((set, get) => ({
  saving: false,

  // page
  pages: [],
  loadingPages: false,
  loadPages: async () => {
    set({ loadingPages: true });
    const pages = await getPageList(null, 0);
    set({ pages: pages, loadingPages: false });
  },

  // entity
  entities: [],
  loadingEntities: false,
  loadEntities: async (page_id?: string) => {
    set({ loadingEntities: true });
    const entities = await getPageEntities(page_id);
    set({ entities: entities, loadingEntities: false });
  },

  // permission
  permissions: {},
  parentPermissions: {},
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
  },

  // company
  companies: [],
  selectedCompany: [],
  parentSelectedCompany: [],
  loadingCompanies: false,
  loadCompanies: async () => {
    set({ loadingCompanies: true });
    const items = await getCompanies();
    set({ companies: items, loadingCompanies: false });
  },

  // project
  projects: [],
  selectedProject: [],
  parentSelectedProject: [],
  loadingProjects: false,
  loadProjects: async (companyId: string) => {
    set({ loadingProjects: true });
    const pages = await getProjects(companyId, "", "", "", 1, 10000);
    set({ projects: pages.items, loadingProjects: false });
  }
}));
