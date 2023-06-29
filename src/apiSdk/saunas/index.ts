import axios from 'axios';
import queryString from 'query-string';
import { SaunaInterface, SaunaGetQueryInterface } from 'interfaces/sauna';
import { GetQueryInterface } from '../../interfaces';

export const getSaunas = async (query?: SaunaGetQueryInterface) => {
  const response = await axios.get(`/api/saunas${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSauna = async (sauna: SaunaInterface) => {
  const response = await axios.post('/api/saunas', sauna);
  return response.data;
};

export const updateSaunaById = async (id: string, sauna: SaunaInterface) => {
  const response = await axios.put(`/api/saunas/${id}`, sauna);
  return response.data;
};

export const getSaunaById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/saunas/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSaunaById = async (id: string) => {
  const response = await axios.delete(`/api/saunas/${id}`);
  return response.data;
};
