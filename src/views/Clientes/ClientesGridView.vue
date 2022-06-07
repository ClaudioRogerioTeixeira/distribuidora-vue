<template>

  <div class="container mt-5">

    <b-alert variant="success" show><b-icon icon="people-fill" class="mr-2"></b-icon>Clientes</b-alert>
    <div class="d-flex justify-content-end">
      <b-button variant="outline-success" class="mb-2" v-b-tooltip.hover="{ variant: 'success' }" title="Incluir Cliente" to="/cadastro"><b-icon icon="person-plus"></b-icon></b-button>
    </div>
    <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :busy="isBusy" responsive sticky-header striped hover head-variant="light" :fields="fields" :items="clientes" class="table-clientes">
      <!-- actions - botões -->
      <template v-slot:cell(actions)="data">
        <b-button variant="outline-success" v-on:click="editar(data.item.id)" class="mr-2" v-b-tooltip.hover="{ variant: 'success' }" title="Editar registro"><b-icon icon="pencil"></b-icon></b-button>
        <b-button variant="outline-danger" v-on:click="excluir(data.item.id)" v-b-tooltip.hover="{ variant: 'danger' }" title="Excluir registro"><b-icon icon="trash"></b-icon></b-button>
      </template>
      <!-- Carregando -->
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Carregando...</strong>
        </div>
      </template>
      <!-- Tipo - utilizando icones -->
      <template #cell(tipo)="data">
        <span v-html="data.value == 0 ? 'Jurídico' : 'Físico' "></span>
      </template>      
      <template #table-caption>Registros: {{clientes.length}}</template>
    </b-table>

    <!-- Implantando modal -->
    <!-- 
    <template>
      <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
        <div class="d-block text-left">
          Deseja realmente excluir a tarefa: {{ taskSelected.titulo }}
        </div>
        <div class="d-flex justify-content-end mt-3">
          <b-button variant="outline-ligth" @click="hideModal">Cancelar</b-button>
          <b-button class="ml-2" variant="outline-danger" @click="confirmRemoveTask">Excluir</b-button>
        </div>
      </b-modal>      
    </template>
    -->

  </div>

</template>

<script>
  import ClientesServices from '@/services/clientesServices'
  import ToastMixin from '@/mixins/toastMixin.js'

  export default {
    name: 'ClientesGridView',
    mixins: [ToastMixin],
    data() {
      return {
        clientes: [],
        isBusy: false,
        sortBy: 'nome',
        sortDesc: false,        
        fields: [ 
          { 
            key: 'nome',
            label: 'Nome',
            sortable: true,
            formatter: value => {
              return value.toUpperCase()
            }            
          },
          { 
            key: 'tipo',
            label: 'Tipo',
            sortable: true,
            // formatter: value => {
            //   return value == 0 ? 'Físico' : 'Jurídico'
            // }
            // formatter: value => {
            //   return value == 0 ? '<b-icon icon="people-fill"></b-icon>' : '<b-icon icon="people-fill"></b-icon>'
            // }            
          },
          { 
            key: 'cnpjCpf',
            label: 'Cnpj/Cpf',
            sortable: true,
            // variant: 'success'
          },
          { 
            key: 'email',
            label: 'Email',
            sortable: true,
            filterByFormatted: true
          },
          { 
            key: 'dataCadastro',
            label: 'Data',
            sortable: true,
            formatter: value => {
              return value.substring(10, 0).split('-').reverse().join('/')
            }
          },
          { 
            key: 'actions',
            label: 'Ações',
          }
        ]
      }
    },   
    created() {
      this.getClientes()
    },
    methods: {
      getClientes() {
        this.isBusy = true
        ClientesServices.getClientes().then( response => {
          setTimeout(() => {
          this.clientes = response.data
          this.isBusy = false
          this.showToast('Sucesso', `Clientes carregados com sucesso`, 'success')        
          }, 500);
        }
        )
      },
      editar(id) {
        console.log('Editar id', id)
        this.$router.push({ name: 'cadastro', params: { id: id} })
      },
      excluir(id) {
        ClientesServices.deleteCliente(id).then( () => {
          this.showToast('Sucesso', `Cliente excluido com sucesso`, 'success')
          this.getClientes();
        })
      }
    }
  }
</script>

<style scoped>

</style>
