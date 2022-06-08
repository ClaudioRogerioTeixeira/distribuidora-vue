<template>

  <div class="container mt-5">

    <b-alert variant="success" show><b-icon icon="people-fill" class="mr-2"></b-icon>Clientes</b-alert>
    <div class="d-flex justify-content-between">
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Busca por nome:"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder=""
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-button variant="outline-success" class="mb-2" v-b-tooltip.hover="{ variant: 'success' }" title="Incluir Cliente" to="/cadastro"><b-icon icon="person-plus"></b-icon></b-button>
    </div>
    <b-table id="tab-clientes" :filter="filter" :filter-included-fields="filterOn" :current-page="currentPage" :per-page="perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :busy="isBusy" responsive sticky-header striped hover head-variant="light" :fields="fields" :items="clientes">
      <!-- actions - botões -->
      <template v-slot:cell(actions)="data">
        <b-button variant="outline-success" v-on:click="editar(data.item.id)" class="mr-2" v-b-tooltip.hover="{ variant: 'success' }" title="Editar registro"><b-icon icon="pencil"></b-icon></b-button>
        <b-button variant="outline-danger" v-on:click="excluir(data.item)" v-b-tooltip.hover="{ variant: 'danger' }" title="Excluir registro"><b-icon icon="trash"></b-icon></b-button>
      </template>
      <!-- Carregando -->
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Carregando...</strong>
        </div>
      </template>
      <!-- Tipo -->
      <template #cell(tipo)="data">
        <span v-html="data.value == 0 ? 'Jurídico' : 'Físico' "></span>
      </template>      
      <!-- <template #table-caption>Registros: {{clientes.length}}</template> -->
    </b-table>
    <!-- Total/Per Page/Paginação -->
    <div class="d-flex justify-content-end">
      <b-row>
        <b-col cols="4">
          <b-button variant="success" v-b-tooltip.hover="{ variant: 'success' }" title="Total Registros">
            Registros <b-badge variant="light">{{rows}}</b-badge>
          </b-button>
        </b-col>
        <!-- per page -->
        <b-col>
          <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              v-b-tooltip.hover="{ variant: 'success' }" title="Itens por página"
            ></b-form-select>
        </b-col>
        <!-- Paginação -->
        <b-col>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="tab-clientes"
            v-b-tooltip.hover="{ variant: 'success' }" title="Paginação"
          ></b-pagination>
        </b-col>    
      </b-row>
    </div>

    <!-- Modal Exclusão  -->
    <template>
      <b-modal ref="modalRemove" hide-footer title="Exclusão de cliente">
        <div class="d-block text-left">
          Deseja realmente excluir o(a) cliente {{ clienteSelected.nome }}
        </div>
        <div class="d-flex justify-content-end mt-3">
          <b-button variant="outline-ligth" @click="hideModal">Cancelar</b-button>
          <b-button class="ml-2" variant="outline-danger" @click="confirmRemoveCliente">Excluir</b-button>
        </div>
      </b-modal>      
    </template>

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
        // variáveis table
        isBusy: false,
        sortBy: 'nome',
        sortDesc: false,
        // variáveis paginação
        currentPage: 5,
        perPage: 3,
        // variáveis per page
        pageOptions: [3, 5, 10, 15],
        // variáveis filtragem
        filter: null,
        filterOn: [],                
        // variável criada para selecionar o cliente na hora da exclusão, utilizada para passar o valor na modal
        clienteSelected: [],
        // array de configuração da tabela
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
      // método carrega os clientes
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
      // método edita o cliente
      editar(id) {
        this.$router.push({ name: 'cadastro', params: { id: id} })
      },
      // método exclui o cliente
      excluir(cliente) {
        this.clienteSelected = cliente
        this.$refs.modalRemove.show()
      },
      // método de confimação da modal e exclusão do cliente
      confirmRemoveCliente() {
        ClientesServices.deleteCliente(this.clienteSelected.id).then( () => {
          this.showToast('Sucesso', `Cliente excluido com sucesso`, 'success')
          this.clienteSelectd = ''
          this.hideModal()
          this.getClientes();
        }).catch(error => {
          console.log('error', error)
        })
      },
      // método esconde modal
      hideModal() {
        this.$refs.modalRemove.hide()
      },
    },
    computed: {
      rows() {
        return this.clientes.length
      }
    }
  }
</script>

<style scoped>

</style>
