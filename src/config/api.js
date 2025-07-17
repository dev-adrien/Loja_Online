// Configuração da API
export const API_BASE_URL = 'https://6876f363dba809d901ed7edc.mockapi.io';
export const API_ENDPOINTS = {
  produtos: `${API_BASE_URL}/produtos`
};

// Função utilitária para construir URLs de produtos específicos
export const getProdutoUrl = (id) => `${API_ENDPOINTS.produtos}/${id}`;
