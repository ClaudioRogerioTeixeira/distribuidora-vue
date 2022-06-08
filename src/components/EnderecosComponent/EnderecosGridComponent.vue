<template>
  <div class="container mt-2">
    <div class="d-flex justify-content-end">
      <b-button variant="outline-success" class="mb-2" v-b-tooltip.hover="{ variant: 'success' }" title="Incluir Endereço" to="/cadastro"><b-icon icon="journal-plus"></b-icon></b-button>
    </div>    
    <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :busy="isBusy" responsive sticky-header striped hover head-variant="light" :items="enderecos" :fields="fields">
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
        <!-- <span v-html="data.value == 0 ? 'Jurídico' : 'Físico' "></span> -->
        <span v-html="selectedTipo(data.value)"></span>
      </template>      
      <template #table-caption>Registros: {{enderecos.length}}</template>    
    </b-table>
  </div>
</template>

<script>
  import EnderecosServices from '@/services/enderecosServices'

  export default {
    name: 'EnderecosGridComponent',
    props: { fieldClienteId: String },
    data() {
      return {
        enderecos: [],
        isBusy: false,
        sortBy: 'nome',
        sortDesc: false,    
        // variável criada para selecionar o cliente na hora da exclusão, utilizada para passar o valor na modal
        enderecosSelected: [],
        // // array de configuração da tabela
        fields: [ 
          { 
            key: 'tipo',
            label: 'Tipo',
            sortable: true,         
          },
          { 
            key: 'logradouro',
            label: 'Logradouro',
            sortable: true,
          },
          { 
            key: 'numero',
            label: 'Número',
            sortable: true,
          },
          { 
            key: 'bairro',
            label: 'Bairro',
            sortable: true,
          },
          { 
            key: 'cidade',
            label: 'Cidade',
            sortable: true,
          },
          { 
            key: 'uf',
            label: 'UF',
            sortable: true,
          },
          { 
            key: 'cep',
            label: 'Cep',
            sortable: true,
          },
          { 
            key: 'actions',
            label: 'Ações',
          }
          ]         
      }
    },
    created() {
      EnderecosServices.getEnderecos().then( response => {
        this.enderecos = response.data.filter( enderecos => enderecos.clienteId == this.fieldClienteId)
      })
    },
    methods: {
      selectedTipo(tipo) {
        if (tipo == 0) return 'Cobrança'
        if (tipo == 1) return 'Comercial'
        if (tipo == 2) return 'Correspondência'
        if (tipo == 3) return 'Entrega'
        if (tipo == 4) return 'Residencial'
      }
    }

  }
</script>

<style scoped>

</style>
