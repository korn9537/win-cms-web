import { compactQuery } from "@/helpers/compact-query";
import axios from "axios";
import { CountryModel } from "./models/country.model";
import { ProvinceModel } from "./models/province.model";
import { DistrictModel } from "./models/district.model";
import { SubDistrictModel } from "./models/subdistrict.model";
import { CreateAddressDTO } from "./dto/create-address.input";

const endpoint = "/graphql";

export const createAddress = async (address: CreateAddressDTO): Promise<any> => {
  const query = `
    mutation createAddress($address: CreateAddressDTO!) {
        createAddress(address: $address) {
            id
        }
    }
`;

  const variables = {
    address
  };

  const {
    data: { data }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.createAddress;
};

export const getCountries = async (): Promise<CountryModel[]> => {
  const query = `
    query countries {
        countries {
            id 
            name_th
        }
    }
`;

  const {
    data: { data }
  } = await axios.post(endpoint, {
    query: compactQuery(query)
  });

  return data.countries;
};

export const getProvinces = async (): Promise<ProvinceModel[]> => {
  const query = `
    query provinces {
        provinces {
            id 
            name_th
        }
    }
`;

  const {
    data: { data }
  } = await axios.post(endpoint, {
    query: compactQuery(query)
  });

  return data.provinces;
};

export const getDistricts = async (provinceId: string): Promise<DistrictModel[]> => {
  const query = `
    query districts($provinceId: String!) {
        districts(provinceId: $provinceId) {
            id 
            name_th
        }
    }
`;

  const variables = {
    provinceId
  };

  const {
    data: { data }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.districts;
};

export const getSubDistricts = async (districtId: string): Promise<SubDistrictModel[]> => {
  const query = `
    query subDistricts($districtId: String!) {
        subDistricts(districtId: $districtId) {
            id 
            name_th
            post_code
        }
    }
`;

  const variables = {
    districtId
  };

  const {
    data: { data }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.subDistricts;
};
