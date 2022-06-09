import axios from 'axios';

export default {
  
  getClientes:() => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/clientes`);
  },

  getCliente:(id) => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/clientes/${id}`)
  },

  postCliente:(cliente) => {
    return axios.post(`${process.env.VUE_APP_BASE_URL}/clientes`, cliente)
  },

  putCliente:(cliente) => {
    return axios.put(`${process.env.VUE_APP_BASE_URL}/clientes/${cliente.id}`, cliente)
  },

  deleteCliente:(id) => {
    return axios.delete(`${process.env.VUE_APP_BASE_URL}/clientes/${id}`)
  }

}