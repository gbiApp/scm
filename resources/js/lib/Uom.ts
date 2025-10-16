import { IUom } from '@/types';

export const fetchUom = async (inputValue: string) => {
  if (!inputValue) return [];

  try {
    const response = await window.axios.get(route('uom.search', { search: inputValue }));

    return response.data.data.map((uom: IUom) => ({
      value: uom.uom,
      label: `${uom.uom} - ${uom.uom_text}`,
    }));
  } catch (e: any) {
      console.warn('UOM fetch failed:', {
        message: e?.message,
        status: e?.response?.status,
        url: e?.config?.url,
      });
    return [];
  }
};
