import _ from 'lodash';

export const deepClone = (obj: any) => {
  return _.cloneDeep(obj);
};

export const subNumber = (num: number, type: string) => {
    // Mock implementation based on original usage context
    return [100]; 
};

export const exchangeRateFormatter = (val: any) => {
    return '1.00';
};

export const getStore = (params: any) => {
    return 'mock-tenant-id';
};
