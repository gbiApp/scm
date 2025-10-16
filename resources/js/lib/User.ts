import { User } from '@/types';

export const fetchUser = async (inputValue: string) => {
  if (!inputValue) return [];

  try {
    const response = await window.axios.get(route('user.search', { search: inputValue }));

    return response.data.data.map((item: User) => ({
      value: item.id,
      label: item.name,
      position: item.position,
    }));
  } catch (e : any) {
      console.warn('Users fetch failed:', {
        message: e?.message,
        status: e?.response?.status,
        url: e?.config?.url,
      });
    return [];
  }
};
