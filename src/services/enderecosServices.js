import axios from 'axios';

export default {
  
  getEnderecos:() => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/api/enderecos`);
  },

  // getCliente:(id) => {
  //   return axios.get(`${process.env.VUE_APP_BASE_URL}/api/clientes/${id}`)
  // },

  // postCliente:(cliente) => {
  //   return axios.post(`${process.env.VUE_APP_BASE_URL}/api/clientes`, cliente)
  // },

  // putCliente:(cliente) => {
  //   return axios.put(`${process.env.VUE_APP_BASE_URL}/api/clientes/${cliente.id}`, cliente)
  // },

  // deleteCliente:(id) => {
  //   return axios.delete(`${process.env.VUE_APP_BASE_URL}/api/clientes/${id}`)
  // }

}