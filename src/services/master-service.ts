import { IBankAccount } from '@/interfaces/bank-account.interface';
import { IReason } from '@/interfaces/reason.interface';
import axios from 'axios';
import country_list from './data/country-th.json';

export const getCountry = (excludes: string[] = []) => {
  let mapped: Array<{ label: string; value: string }> = country_list.map((w) => ({
    label: w.name,
    value: w.isocode,
  }));

  if (excludes.length > 0) {
    mapped = mapped.filter((w) => excludes.includes(w.value) == false);
  }

  return mapped;
};

export interface IProvince {
  id: string;
  name_th: string;
  name_en: string;
  geography_id?: number;
}

export const getProvinces = (): Promise<Array<IProvince>> => {
  return axios.get('/master/address/provinces').then((res) => res.data);
};

export interface IDistrict {
  id: string;
  name_th: string;
  name_en: string;
  province_id: string;
}

export const getDistricts = (province_id: string): Promise<Array<IDistrict>> => {
  if (!province_id) {
    return Promise.resolve([]);
  }

  return axios
    .get('/master/address/districts', {
      params: {
        province_id,
      },
    })
    .then((res) => res.data);
};

export interface ISubDistrict {
  id: string;
  name_th: string;
  name_en: string;
  post_code: string;
  province_id: string;
  district_id: string;
}

export const getSubDistricts = (district_id: string): Promise<Array<ISubDistrict>> => {
  if (!district_id) {
    return Promise.resolve([]);
  }

  return axios.get('/master/address/subdistricts', { params: { district_id } }).then((res) => res.data);
};

export interface IMasterCommon {
  id: string;
  code?: string;
  name_th: string;
  name_en: string;
}
export interface INamePrefix extends IMasterCommon {}

export const getNamePrefixes = (): Promise<Array<INamePrefix>> => {
  return axios
    .get('/master/name-prefix', {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data.data);
};

export interface IOrigin extends IMasterCommon {}

export const getOrigins = (): Promise<Array<IOrigin>> => {
  return axios
    .get('/master/origins', {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data);
};

export interface INationality extends IMasterCommon {}

export const getNationalities = (): Promise<Array<INationality>> => {
  return axios
    .get('/master/nationalities', {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data);
};

export interface ICompany extends IMasterCommon {}

export const getCompanies = (): Promise<Array<ICompany>> => {
  return axios
    .get('/master/companies', {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data.data);
};
export interface IBrand extends IMasterCommon {}
export const getBrands = (): Promise<Array<IBrand>> => {
  return axios
    .get('/master/brands', {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data.data);
};

export const getBrandByCompanys = (companyId: string): Promise<Array<IBrand>> => {
  return axios
    .get('/master/brands', { params: { companyId, row_per_page: 0, status: 'active' } })
    .then((res) => res.data.data);
};
export interface IBank extends IMasterCommon {}

export const getBanks = (): Promise<Array<IBank>> => {
  return axios
    .get('/master/banks', {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data.data);
};

export interface IBankBranch extends IMasterCommon {}

export const getBankBranches = (bankId: string, province_id: string): Promise<Array<IBankBranch>> => {
  if (bankId == '') {
    return new Promise((resolve) => resolve([]));
  }
  return axios
    .get(`master/banks/${bankId}/branches`, {
      params: {
        row_per_page: 0,
        status: 'active',
        province_id,
      },
    })
    .then((res) => {
      if (res.data?.data) {
        return res.data.data;
      }
      return res.data || [];
    });
};
export interface IMasterPromotionType {
  id: string;
  name_th: string;
  name_en: string;
}

export const getSubTypeByPromotionType = (promotion_type: string): Promise<Array<IMasterPromotionType>> => {
  return axios
    .get(`master/promotion-item-type`, { params: { type: promotion_type, status: 'active', row_per_page: 0 } })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      }
      return res.data || [];
    });
};

export interface IBankProvince extends IMasterCommon {}

export const getBankProvinceByBankId = (bankId: string): Promise<Array<IBankProvince>> => {
  if (bankId == '') {
    return new Promise((resolve) => resolve([]));
  }
  return axios
    .get(`/master/banks/${bankId}/provinces`, {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data);
};
export const getReasonByGroupId = (reasonGroupId: string): Promise<Array<IReason>> => {
  return axios
    .get(`/master/reason-groups/${reasonGroupId}/reasons`, {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data.data);
};

export interface IAccountType extends IMasterCommon {}

export const getAccountType = (): Promise<Array<IAccountType>> => {
  return axios
    .get(`/master/bank-accounts/account-types`, {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data);
};

export interface ITermGroup extends IMasterCommon {}

export const getTermGroups = (): Promise<Array<ITermGroup>> => {
  return axios
    .get(`/master/payment-term-groups`, {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data.data);
};

export interface IProjectType {
  id: string;
  name_th: string;
  name_en: string;
}

export const getProjectTypes = (): Promise<Array<IProjectType>> => {
  return axios
    .get(`/master/project-types`, {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data);
};

export interface IProject {
  id: string;
  name_th: string;
  name_en: string;
}

export const getProjects = (project_type: string, company_id?: string): Promise<Array<IProject>> => {
  return axios
    .get(`projects`, {
      params: { project_type: project_type, company_id: company_id, status: 'active', row_per_page: 0 },
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      }
      return res.data || [];
    });
};

export interface ISbu extends IMasterCommon {}
export const getSbus = (): Promise<Array<ISbu>> => {
  return axios
    .get(`/master/sbu`, {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data);
};
export const getSbusByProject = (project_id: string): Promise<Array<ISbu>> => {
  return axios
    .get(`/master/sbu/project`, {
      params: { project_id: project_id, isdelete: false, row_per_page: 0, status: 'active' },
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      }
      return res.data || [];
    });
};

export interface IBudgetType extends IMasterCommon {}
export const getBudgetTypes = (): Promise<Array<IBudgetType>> => {
  return axios
    .get(`/master/promotion-budget-type`, {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data);
};

export interface IBudgetBy extends IMasterCommon {}
export const getBudgetBys = (): Promise<Array<IBudgetBy>> => {
  return axios
    .get(`/master/promotion-by-budget`, {
      params: {
        row_per_page: 0,
        status: 'active',
      },
    })
    .then((res) => res.data);
};

export const getBankInfo = async (id: string): Promise<IBank> => {
  const res = await axios.get(`/master/banks/${id}`);
  return res.data;
};
export const getBankAccountByCompany = (company_id?: string): Promise<Array<IBankAccount>> => {
  return axios
    .get(`/master/bank-accounts`, {
      params: { companyId: company_id, row_per_page: 0, status: 'active' },
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      }
      return res.data || [];
    });
};
export const getTermGroupInfo = async (id: string): Promise<ITermGroup> => {
  const res = await axios.get(`/master/payment-term-groups/${id}`);
  return res.data;
};

export const rounding = [
  {
    text: 'ไม่ปัดเศษ',
    value: 'N',
  },
  {
    text: 'ปัดขึ้นจำนวนเต็ม',
    value: 'U',
  },
  {
    text: 'ปัดลงจำนวนเต็ม',
    value: 'D',
  },
  {
    text: 'ปัดตามหลักคณิตศาสตร์',
    value: 'H',
  },
] as { text: string; value: string }[];

export const termsDO = [
  {
    text: 'เงินจอง',
    value: '-',
  },
  {
    text: 'เงินทำสัญญา',
    value: '0',
  },
  {
    text: 'เงินดาวน์งวดที่ 1',
    value: '001',
  },
  {
    text: 'เงินดาวน์งวดที่ 2',
    value: '002',
  },
  {
    text: 'เงินดาวน์งวดที่ 3',
    value: '003',
  },
  {
    text: 'เงินดาวน์งวดที่ 4',
    value: '004',
  },
  {
    text: 'เงินดาวน์งวดที่ 5',
    value: '005',
  },
  {
    text: 'เงินดาวน์งวดที่ 6',
    value: '006',
  },
  {
    text: 'เงินดาวน์งวดที่ 7',
    value: '007',
  },
  {
    text: 'เงินดาวน์งวดที่ 8',
    value: '008',
  },
  {
    text: 'เงินดาวน์งวดที่ 9',
    value: '009',
  },
  {
    text: 'เงินดาวน์งวดที่ 10',
    value: '010',
  },
  {
    text: 'เงินดาวน์งวดที่ 11',
    value: '011',
  },
  {
    text: 'เงินดาวน์งวดที่ 12',
    value: '012',
  },
  {
    text: 'เงินดาวน์งวดที่ 13',
    value: '013',
  },
  {
    text: 'เงินดาวน์งวดที่ 14',
    value: '014',
  },
  {
    text: 'เงินดาวน์งวดที่ 15',
    value: '015',
  },
  {
    text: 'เงินดาวน์งวดที่ 16',
    value: '016',
  },
  {
    text: 'เงินดาวน์งวดที่ 17',
    value: '017',
  },
  {
    text: 'เงินดาวน์งวดที่ 18',
    value: '018',
  },
  {
    text: 'เงินดาวน์งวดที่ 19',
    value: '019',
  },
  {
    text: 'เงินดาวน์งวดที่ 20',
    value: '020',
  },
  {
    text: 'เงินดาวน์งวดที่ 21',
    value: '021',
  },
  {
    text: 'เงินดาวน์งวดที่ 22',
    value: '022',
  },
  {
    text: 'เงินดาวน์งวดที่ 23',
    value: '023',
  },
  {
    text: 'เงินดาวน์งวดที่ 24',
    value: '024',
  },
  {
    text: 'เงินดาวน์งวดที่ 25',
    value: '025',
  },
  {
    text: 'เงินดาวน์งวดที่ 26',
    value: '026',
  },
  {
    text: 'เงินดาวน์งวดที่ 27',
    value: '027',
  },
  {
    text: 'เงินดาวน์งวดที่ 28',
    value: '028',
  },
  {
    text: 'เงินดาวน์งวดที่ 29',
    value: '029',
  },
  {
    text: 'เงินดาวน์งวดที่ 30',
    value: '030',
  },
  {
    text: 'เงินดาวน์งวดที่ 31',
    value: '031',
  },
  {
    text: 'เงินดาวน์งวดที่ 32',
    value: '032',
  },
  {
    text: 'เงินดาวน์งวดที่ 33',
    value: '033',
  },

  {
    text: 'เงินดาวน์งวดที่ 34',
    value: '034',
  },
  {
    text: 'เงินดาวน์งวดที่ 35',
    value: '035',
  },
  {
    text: 'เงินดาวน์งวดที่ 36',
    value: '036',
  },
  {
    text: 'เงินดาวน์งวดที่ 37',
    value: '037',
  },
  {
    text: 'เงินดาวน์งวดที่ 38',
    value: '038',
  },
  {
    text: 'เงินดาวน์งวดที่ 39',
    value: '039',
  },
  {
    text: 'เงินดาวน์งวดที่ 40',
    value: '040',
  },
  {
    text: 'เงินดาวน์งวดที่ 41',
    value: '041',
  },
  {
    text: 'เงินดาวน์งวดที่ 42',
    value: '042',
  },
  {
    text: 'เงินดาวน์งวดที่ 43',
    value: '043',
  },
  {
    text: 'เงินดาวน์งวดที่ 44',
    value: '044',
  },
  {
    text: 'เงินดาวน์งวดที่ 45',
    value: '045',
  },
  {
    text: 'เงินดาวน์งวดที่ 46',
    value: '046',
  },
  {
    text: 'เงินดาวน์งวดที่ 47',
    value: '047',
  },
  {
    text: 'เงินดาวน์งวดที่ 48',
    value: '048',
  },
  {
    text: 'เงินดาวน์งวดที่ 49',
    value: '049',
  },
  {
    text: 'เงินดาวน์งวดที่ 50',
    value: '050',
  },
  {
    text: 'เงินดาวน์งวดที่ 51',
    value: '051',
  },
  {
    text: 'เงินดาวน์งวดที่ 52',
    value: '052',
  },
  {
    text: 'เงินดาวน์งวดที่ 53',
    value: '053',
  },
  {
    text: 'เงินดาวน์งวดที่ 54',
    value: '054',
  },
  {
    text: 'เงินดาวน์งวดที่ 55',
    value: '055',
  },
  {
    text: 'เงินดาวน์งวดที่ 56',
    value: '056',
  },
  {
    text: 'เงินดาวน์งวดที่ 57',
    value: '057',
  },

  {
    text: 'เงินดาวน์งวดที่ 58',
    value: '058',
  },
  {
    text: 'เงินดาวน์งวดที่ 59',
    value: '059',
  },

  {
    text: 'เงินดาวน์งวดที่ 60',
    value: '060',
  },
  {
    text: 'เงินงวดสุดท้าย',
    value: '999',
  },
] as { text: string; value: string }[];

export const termsTR = [
  {
    text: 'ค่าธรรมเนียมการโอน',
    value: 'TF',
  },

  {
    text: 'ค่าธรรมเนียมโอน BOI',
    value: 'TFB',
  },

  {
    text: 'ค่าธรรมเนียมในการจดจำนอง',
    value: 'MF',
  },

  {
    text: 'ค่าติดตั้งมิเตอร์ไฟฟ้า',
    value: 'ME',
  },

  {
    text: 'ค่าติดตั้งมิเตอร์น้ำประปา',
    value: 'MW',
  },

  {
    text: 'ค่าประกันมิเตอร์ไฟฟ้า',
    value: 'MEI',
  },

  {
    text: 'ค่าดำเนินการจดทะเบียนนิติกรรม',
    value: 'F01',
  },

  {
    text: 'ค่าบริการสาธารณะ (ค่าส่วนกลาง)',
    value: 'P1',
  },

  {
    text: 'เงินกองทุนอาคารชุดเรียกเก็บครั้งเดียว',
    value: 'P2',
  },

  {
    text: 'ค่าบริการส่วนกลางภาระจำยอม',
    value: 'P3',
  },
] as { text: string; value: string }[];

export const termsOther = [
  {
    text: 'ค่าธรรมเนียมเปลี่ยนแปลงชื่อ',
    value: 'CNF',
  },

  {
    text: 'รายได้ค่าบริการอื่่นๆ',
    value: 'OTH',
  },
] as { text: string; value: string }[];
