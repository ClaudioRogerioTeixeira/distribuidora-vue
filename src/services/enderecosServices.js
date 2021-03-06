import axios from 'axios';

export default {
  
  getEnderecos:() => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/enderecos`);
  },

  getEndereco:(id) => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/enderecos/${id}`)
  },

  postEndereco:(endereco) => {
    return axios.post(`${process.env.VUE_APP_BASE_URL}/enderecos`, endereco)
  },

  putEndereco:(endereco) => {
    return axios.put(`${process.env.VUE_APP_BASE_URL}/enderecos/${endereco.id}`, endereco)
  },

  deleteEndereco:(id) => {
    return axios.delete(`${process.env.VUE_APP_BASE_URL}/enderecos/${id}`)
  }

}