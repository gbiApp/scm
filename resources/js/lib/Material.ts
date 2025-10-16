import { IMaterial } from '@/types';

export const fetchMaterial = async (inputValue: string) => {
  if (!inputValue) return [];

  try {
    const response = await window.axios.get(route('material.search', { search: inputValue }));

    return response.data.data.map((material: IMaterial) => ({
      value: material.mat_code,
      label: `${material.mat_code} - ${material.mat_desc}`, 
      mappedPlants: material.mappedPlants || [], 
    }));
  } catch (e :any) {
    console.warn('Material fetch  failed:', {
        message: e?.message,
        status: e?.response?.status,
        url: e?.config?.url,
      });
    return [];
  }
};
