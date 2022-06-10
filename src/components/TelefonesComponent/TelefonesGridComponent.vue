<template>
  <div>
    <div class="container mt-2">
      <div class="d-flex justify-content-end">
        <b-button variant="outline-success" class="mb-2" v-b-tooltip.hover="{ variant: 'success' }" title="Incluir Telefone" v-on:click="incluir"><b-icon icon="telephone-plus"></b-icon></b-button>
      </div>
      <!-- Tabela Telefones -->
      <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :busy="isBusy" responsive sticky-header striped hover head-variant="light" :items="telefones" :fields="fields">
        <!-- actions - botões -->
        <template v-slot:cell(actions)="data">
          <b-button variant="outline-success" v-on:click="editarModal(data.item)" class="mr-2" v-b-tooltip.hover="{ variant: 'success' }" title="Editar registro"><b-icon icon="pencil"></b-icon></b-button>
          <b-button variant="outline-danger" v-on:click="excluir(data.item.id)" v-b-tooltip.hover="{ variant: 'danger' }" title="Excluir registro"><b-icon icon="trash"></b-icon></b-button>
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

    <!-- MODAL Inclusão/Alteração Telefone -->
    <template>
      <b-modal ref="modalTelefone" hide-footer size="lg" centered>
        <template #modal-title>
          {{modal == 'edit' ? 'Alteração de Telefone' : 'Inclusão de Telefone'}}
        </template>         

        <b-form class="mt-2">
          <b-row>          
            <!-- selected tipo -->
            <b-col lg="5" md="5" sm="12">
              <b-form-group id="tipo-group" label="Tipo">
                <b-form-select id="tipo" v-model="form.tipo" :options="options" name="tipo"></b-form-select>
              </b-form-group>
            </b-col>
            <!-- DDD -->
            <b-col lg="3" md="3" sm="12">
            <b-form-group id="ddd-group" label="DDD" label-for="ddd">
              <b-form-input id="ddd" v-model="form.ddd" placeholder="DDD"></b-form-input>
            </b-form-group>
            </b-col>
            <!-- número -->
            <b-col lg="3" md="4" sm="12">
            <b-form-group id="numero-group" label="Número" label-for="numero">
              <b-form-input id="numero" v-model="form.numero" placeholder="Digite o número" v-mask="'#####-####'"></b-form-input>
            </b-form-group>
            </b-col>            
          </b-row>
          <b-row>
            <!-- observacao -->
            <b-col cols="12">
              <b-form-group id="observacao-group" label="Observação" label-for="observacao">
                <b-form-textarea id="observacao" v-model="form.observacao" placeholder="Digite sua observação" rows="3" max-rows="6"></b-form-textarea>             
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>

        <div class="d-flex justify-content-end mt-3">
          <b-button variant="outline-ligth" v-b-tooltip.hover="{ variant: 'ligth' }" title="Cancelar Telefone" @click="hideModal"><b-icon icon="box-arrow-up-left" class="mr-1"></b-icon>Cancelar</b-button>
          <b-button class="ml-2" variant="outline-success" v-b-tooltip.hover="{ variant: 'success' }" title="Incluir Telefone" @click="salvar(form)"  v-if="!form.id"><b-icon icon="save" class="mr-1"></b-icon>Salvar</b-button>
          <b-button type="button" variant="outline-warning" v-b-tooltip.hover="{ variant: 'warning' }" title="Alterar Telefone"  v-on:click="update(form)" v-if="form.id"><b-icon icon="arrow-clockwise" class="mr-1"></b-icon>Alterar</b-button>
        </div>
      </b-modal>      
    </template>    

  </div>
</template>

<script>
  import TelefonesServices from '@/services/telefonesServices'
  import ToastMixin from '@/mixins/toastMixin.js'

  export default {
    name: 'TelefonesGridComponent',
    props: { fieldClienteId: String },
    mixins: [ToastMixin],
    data() {
      return {
        telefones: [],
        isBusy: false,
        sortBy: 'tipo',
        sortDesc: false,
        modal: null,
        form: {
          id: '',
          tipo: '0',
          ddd: '',
          numero: '',
          observacao: '',
          clienteId: ''
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
        // opções do select tipo na modal
        options: [
          { value: '0', text: 'Celular' },
          { value: '1', text: 'Residencial' },
          { value: '2', text: 'Comercial' },
        ],     
      }
    },
    created() {
      this.getTelefones()
    },
    methods: {
      // método carrega telefones
      getTelefones() {
        TelefonesServices.getTelefones().then( response => {
          this.telefones = response.data.filter( telefones => telefones.clienteId == this.fieldClienteId)
        })
      },
      // método inclusão modal
      incluir() {
        this.clearForm()
        this.modal = 'new'
        this.$refs.modalTelefone.show()
      },
      // método salvar modal
      salvar(form) {
        const fone = this.form.numero
        this.form.telefone = fone.replace(/[^\w-]+/g, '-')
        this.form.clienteId = this.fieldClienteId
        this.form.id = undefined
        this.form.tipo = this.form.tipo.toString()
        TelefonesServices.postTelefone(form).then( () => {
        this.showToast('Sucesso', `Telefone incluído com sucesso`, 'success')        
        this.$refs.modalTelefone.hide()
        this.getTelefones()
        })
      },
      // método update modal
      update(form) {
        TelefonesServices.putTelefone(form).then( response => {
        console.log('update response', response.data)
        this.showToast('Sucesso', `Telefone alterado com sucesso`, 'success')        
        this.$refs.modalTelefone.hide()
         this.getTelefones()
        })
      },
      // método edição grid
      editarModal(telefone) {
        this.form = telefone
        this.modal = 'edit'
        this.$refs.modalTelefone.show()
      },
      // método exclusão grid
      excluir(id) {
        TelefonesServices.deleteTelefone(id).then( () => {
          this.showToast('Sucesso', `Telefone excluido com sucesso`, 'success')
          this.getTelefones()
        })

      },
       // método esconde modal
      hideModal() {
        this.$refs.modalTelefone.hide()
      },
      // mostra os tipos do select no grid
      selectedTipo(tipo) {
        if (tipo == 0) return 'Celular'
        if (tipo == 1) return 'Residencial'
        if (tipo == 2) return 'Comercial'
      },
      clearForm() {
        this.form = {
          id: null,
          tipo: 0,
          ddd: null,
          observacao: null,
          clienteId: null
        }                
      }            
    }    
  }
</script>

<style scoped>

</style>
