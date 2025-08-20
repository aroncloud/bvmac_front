import axios, { Axios, type AxiosResponse } from 'axios';

import type { ActionData, ObligationData, ActionAutoComplete, ObligationAutoComplete } from '../types/options';

const API_BASE_URL = import.meta.env.VITE_APP_URL_BACKEND_API;

export const getActionData = (): Promise<AxiosResponse<ActionData[]>> => {
  return axios.get(`${API_BASE_URL}bulletin/actions`);
}

export const getObligationData = (): Promise<AxiosResponse<ObligationData[]>> => {
  return axios.get(`${API_BASE_URL}bulletin/obligations`);
}


export const getActionDataFilter = (filters: string[]=[], searchTerm: string = ''): Promise<AxiosResponse<ActionData[]>> => {

  let queryString = '';
  const params = new URLSearchParams();

  if(filters.length > 0){
    params.append('fields', filters.join(','));
  }
  if(searchTerm){
    params.append('search', searchTerm);
  }

   if (params.toString()) {
    queryString = `?${params.toString()}`;
  }

  console.log('params ==>  ' ,queryString)
   const fullUrl = `${API_BASE_URL}bulletin/actiondata${queryString}`;
   console.log('Requête API Action envoyée :', fullUrl);
  return axios.get(fullUrl);

}

export const getObligationFilter = ( filters: string[] = [], searchTerm: string = ''): Promise<AxiosResponse<ObligationData[]>> => {

  let queryString = '';
  const params = new URLSearchParams();


  if(filters.length > 0){
    params.append('fields', filters.join(','));
  }
  if (searchTerm) {
    params.append('search', searchTerm); // Ex: &search=monTerme
  }

  if (params.toString()) {
    queryString = `?${params.toString()}`;
  }

  console.log('params ==>  ' ,queryString)
   const fullUrl = `${API_BASE_URL}bulletin/obligation${queryString}`;
   console.log('Requête API Obligations envoyée :', fullUrl);
  return axios.get(fullUrl);
}

export const getActionAutoComplete = (searchTerm: string = ''): Promise<AxiosResponse<ActionAutoComplete[]>> => {
  return axios.get(`${API_BASE_URL}bulletin/action/autocompletion?search=${searchTerm}`);
}

export const getObligationAutoComplete = (searchTerm: string = ''): Promise<AxiosResponse<ObligationAutoComplete[]>> => {
  return axios.get(`${API_BASE_URL}bulletin/obligation/autocompletion?search=${searchTerm}`);
}
