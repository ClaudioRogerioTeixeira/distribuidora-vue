<template>
  <div>
    <div class="container mt-2">
      <div class="d-flex justify-content-end">
        <b-button variant="outline-success" class="mb-2" v-b-tooltip.hover="{ variant: 'success' }" title="Incluir Telefone" v-on:click="incluir"><b-icon icon="telephone-plus"></b-icon></b-button>
      </div>    
      <b-table striped hover :items="telefones" :fields="fields">
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
          <span v-html="selectedTipo(data.value)"></span>
        </template>      
        <template #table-caption>Registros: {{telefones.length}}</template>        
      </b-table>
    </div>

    <template>
      <b-modal ref="modalTelefone" hide-footer size="lg">
        <template #modal-title>
          {{modal == 'edit' ? 'Alteração de Telefone' : 'Inclusão de Telefone'}}
        </template>      
     

        <b-form class="mt-2">
          <b-form-row>
            <!-- selected tipo -->
            <b-col cols="2">
              <b-form-group label="Tipo" v-slot="{ ariaDescribedby }">
                <!-- <b-form-select v-model="selected" :options="options"></b-form-select> -->
                <b-form-select id="tipo" v-model="form.tipo" :options="options" :aria-describedby="ariaDescribedby" name="tipo"></b-form-select>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-form>


        <div class="d-flex justify-content-end mt-3">
          <b-button variant="outline-ligth" @click="hideModal">Cancelar</b-button>
          <b-button class="ml-2" variant="outline-danger" @click="salvar">Salvar</b-button>
        </div>
      </b-modal>      
    </template>    

  </div>
</template>

<script>
  import TelefonesServices from '@/services/telefonesServices'

  export default {
    name: 'TelefonesGridComponent',
    props: { fieldClienteId: String },  
    data() {
      return {
        telefones: [],
        isBusy: false,
        sortBy: 'tipo',
        sortDesc: false,
        modal: null,
        // variável criada para selecionar o cliente na hora da exclusão, utilizada para passar o valor na modal
        enderecosSelected: [],
        form: {
          id: '',
          tipo: '0',
        },               
        // array de configuração da tabela
        fields: [ 
          { 
            key: 'tipo',
            label: 'Tipo',
            sortable: true,         
          },
          { 
            key: 'ddd',
            label: 'DDD',
            sortable: true,
          },
          { 
            key: 'numero',
            label: 'Número',
            sortable: true,
          },
          { 
            key: 'observacao',
            label: 'Observação',
            sortable: true,
          },
          { 
            key: 'actions',
            label: 'Ações',
          }
        ],        
        options: [
          { value: '0', text: 'Celular' },
          { value: '1', text: 'Residencial' },
          { value: '2', text: 'Comercial' },
        ],     
      }
    },
    created() {
      TelefonesServices.getTelefones().then( response => {
        this.telefones = response.data.filter( telefones => telefones.clienteId == this.fieldClienteId)
      })
    },
    methods: {
      incluir() {
        this.modal = 'new'
        this.$refs.modalTelefone.show()
      },
      editar() {
        this.modal = 'edit'
        this.$refs.modalTelefone.show()
      },
      salvar() {
        this.$refs.modalTelefone.hide()
      },
      // mostra os tipos no grid
      selectedTipo(tipo) {
        if (tipo == 0) return 'Celular'
        if (tipo == 1) return 'Residencial'
        if (tipo == 2) return 'Comercial'
      },
       // método esconde modal
      hideModal() {
        this.$refs.modalTelefone.hide()
      },
    }    
  }
</script>

<style scoped>

</style>
