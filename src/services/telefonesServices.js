import axios from 'axios';

export default {
  
  getTelefones:() => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/telefones`);
  },

  getTelefone:(id) => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/telefones/${id}`)
  },

  postTelefone:(telefone) => {
    return axios.post(`${process.env.VUE_APP_BASE_URL}/telefones`, telefone)
  },

  putTelefone:(telefone) => {
    return axios.put(`${process.env.VUE_APP_BASE_URL}/telefones/${telefone.id}`, telefone)
  },

  deleteTelefone:(id) => {
    return axios.delete(`${process.env.VUE_APP_BASE_URL}/telefones/${id}`)
  }

}