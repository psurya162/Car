import api from './api';

const leadService = {
  createLead: async (leadData) => {
    const formData = new FormData();

    Object.keys(leadData).forEach((key) => {
      if (key === 'files') {
        leadData.files.forEach((file, index) => {
          formData.append(`file${index}`, {
            uri: file.uri,
            name: file.name,
            type: file.type,
          });
        });
      } else {
        formData.append(key, leadData[key]);
      }
    });

    const response = await api.post('/leads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default leadService;
