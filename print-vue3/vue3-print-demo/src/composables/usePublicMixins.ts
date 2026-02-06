import { ref } from 'vue';

export const usePublicMixins = () => {
  const customerOpts = ref<any[]>([]);
  const customerCRM = ref<any[]>([]);
  const vendorOpts = ref<any[]>([]);
  const enterVendorInfo = ref<any[]>([]);
  
  // Mock data
  const mockCustomers = [
    { customerId: '1', customerName: 'Mock Customer A' },
    { customerId: '2', customerName: 'Mock Customer B' }
  ];
  
  const mockVendors = [
    { vendorId: '1', vendorName: 'Mock Vendor X' },
    { vendorId: '2', vendorName: 'Mock Vendor Y' }
  ];

  const getStationCustomer = async () => {
    customerOpts.value = mockCustomers;
  };

  const getEnterPubVendorInfo = (params?: any) => {
    enterVendorInfo.value = mockVendors;
  };

  const getAuditVendor = () => {
      vendorOpts.value = mockVendors;
  }

  // Add other necessary methods as no-ops or simple mocks
  const getProvince = () => {};
  const getCity = () => {};
  const getCounty = () => {};
  
  return {
    customerOpts,
    customerCRM,
    vendorOpts,
    enterVendorInfo,
    getStationCustomer,
    getEnterPubVendorInfo,
    getAuditVendor,
    getProvince,
    getCity,
    getCounty
  };
};
