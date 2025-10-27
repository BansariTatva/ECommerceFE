export const handleAxiosErrorMessage = (m: any) => {
    if (m?.response?.data?.validation?.body?.message) {
      return m.response.data.validation.body.message;
    } else if (m?.response?.data?.message) {
      return m.response.data.message;
    } else {
      return m?.toString() || '';
    }
};