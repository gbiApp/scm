import { IVendor } from '@/types';

export const fetchVendor = async (inputValue: string) => {
  if (!inputValue) return [];

  try {
    const response = await window.axios.get(route('vendor.search', { search: inputValue }));
    return response.data.data.map((vendor: IVendor) => ({
      value: vendor.supplier,
      label: `${vendor.supplier} - ${vendor.name_1}`,
    }));
  } catch (e : any) {
    // SOOS: ignore javascript_lang_logger_leak - no logging occurs here
      console.warn('Vendor fetch failed:', {
        message: e?.message,
        status: e?.response?.status,
        url: e?.config?.url,
      });
    return [];
  }
};
