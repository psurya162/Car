import api from './api';

const policyService = {
  fetchPolicies: async () => {
    const response = await api.get('/policies');
    return response.data;
  },
};

export default policyService;
