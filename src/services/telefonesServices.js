import axios from 'axios';

export default {
  
  getTelefones:() => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/api/telefones`);
  },

  getTelefone:(id) => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/api/telefones/${id}`)
  },

  postTelefone:(telefone) => {
    // eslint-disable-next-line no-debugger
    debugger
    return axios.post(`${process.env.VUE_APP_BASE_URL}/api/telefones`, telefone)
  },

  putTelefone:(telefone) => {
    return axios.put(`${process.env.VUE_APP_BASE_URL}/api/telefones/${telefone.id}`, telefone)
  },

  deleteTelefone:(id) => {
    return axios.delete(`${process.env.VUE_APP_BASE_URL}/api/telefones/${id}`)
  }

}