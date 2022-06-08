<template>
  <div>
    <div class="container mt-2">
      <div class="d-flex justify-content-end">
        <b-button variant="outline-success" class="mb-2" v-b-tooltip.hover="{ variant: 'success' }" title="Incluir Endereço" v-on:click="incluir"><b-icon icon="journal-plus"></b-icon></b-button>
      </div>    
      <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :busy="isBusy" responsive sticky-header striped hover head-variant="light" :items="enderecos" :fields="fields">
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
          <!-- <span v-html="data.value == 0 ? 'Jurídico' : 'Físico' "></span> -->
          <span v-html="selectedTipo(data.value)"></span>
        </template>      
        <template #table-caption>Registros: {{enderecos.length}}</template>    
      </b-table>
    </div>

    <!-- MODAL Inclusão/Alteração Endereco -->
    <template>
      <b-modal ref="modalEndereco" hide-footer size="lg" centered>
        <template #modal-title>
          {{modal == 'edit' ? 'Alteração de Endereco' : 'Inclusão de Endereco'}}
        </template>         

        <b-form class="mt-2">
          <b-form-row>          
            <!-- selected tipo -->
            <b-col cols="3">
              <b-form-group id="tipo-group" label="Tipo">
                <b-form-select id="tipo" v-model="form.tipo" :options="options" name="tipo"></b-form-select>
              </b-form-group>
            </b-col>
            <!-- logradouro -->
            <b-col cols="7">
              <b-form-group id="logradouro-group" label="Logradouro" label-for="logradouro">
                <b-form-input id="logradouro" v-model="form.logradouro" placeholder="Digite o logradouro"></b-form-input>
              </b-form-group>
            </b-col>
            <!-- número -->
            <b-col cols="2">
              <b-form-group id="numero-group" label="Número" label-for="numero">
                <b-form-input id="numero" v-model="form.numero" placeholder="Dig. número"></b-form-input>
              </b-form-group>
            </b-col>            
          </b-form-row>
          <b-form-row>
            <!-- complemento -->
            <b-col cols="6">
              <b-form-group id="complemento-group" label="Complemento" label-for="complemento">
                <b-form-input id="complemento" v-model="form.complemento" placeholder="Digite o complemento"></b-form-input>             
              </b-form-group>
            </b-col>
            <!-- bairro -->
            <b-col cols="6">
              <b-form-group id="bairro-group" label="Bairro" label-for="bairro">
                <b-form-input id="bairro" v-model="form.bairro" placeholder="Digite o bairro"></b-form-input>             
              </b-form-group>
            </b-col>            
          </b-form-row>
          <b-form-row>
            <!-- cidade -->
            <b-col cols="8">
              <b-form-group id="cidade-group" label="Cidade" label-for="cidade">
                <b-form-input id="cidade" v-model="form.cidade" placeholder="Digite o cidade"></b-form-input>             
              </b-form-group>
            </b-col>
            <!-- uf -->
            <b-col cols="1">
              <b-form-group id="uf-group" label="UF" label-for="uf">
                <b-form-input id="uf" v-model="form.uf" placeholder="Digite o UF"></b-form-input>             
              </b-form-group>
            </b-col>
            <!-- cep -->
            <b-col cols="3">
              <b-form-group id="cep-group" label="Cep" label-for="cep">
                <b-form-input id="cep" v-model="form.cep" placeholder="Digite o cep"></b-form-input>             
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-form>

        <div class="d-flex justify-content-end mt-3">
          <b-button variant="outline-ligth" v-b-tooltip.hover="{ variant: 'ligth' }" title="Cancelar Endereço" @click="hideModal"><b-icon icon="box-arrow-up-left" class="mr-1"></b-icon>Cancelar</b-button>
          <b-button class="ml-2" variant="outline-success" v-b-tooltip.hover="{ variant: 'success' }" title="Incluir Endereço" @click="salvar(form)"  v-if="!form.id"><b-icon icon="save" class="mr-1"></b-icon>Salvar</b-button>
          <b-button type="button" variant="outline-warning" v-b-tooltip.hover="{ variant: 'warning' }" title="Alterar Endereço"  v-on:click="update(form)" v-if="form.id"><b-icon icon="arrow-clockwise" class="mr-1"></b-icon>Alterar</b-button>
        </div>
      </b-modal>      
    </template>  

  </div>
</template>

<script>
  import EnderecosServices from '@/services/enderecosServices'
  import ToastMixin from '@/mixins/toastMixin.js'

  export default {
    name: 'EnderecosGridComponent',
    props: { fieldClienteId: String },
    mixins: [ToastMixin],
    data() {
      return {
        enderecos: [],
        isBusy: false,
        sortBy: 'nome',
        sortDesc: false,
        modal: null,
        form: {
          id: '',
          tipo: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: '',
          cep: '',
          clienteId: ''
        },               
        // array de configuração da tabela(grid)
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
          ],
        // opções do select tipo na modal
        options: [
          { value: null, text: 'Selecione um item' },
          { value: '0', text: 'Cobrança' },
          { value: '1', text: 'Comercial' },
          { value: '2', text: 'Correspondência' },
          { value: '3', text: 'Entrega' },
          { value: '4', text: 'Residencial' },
        ],             
      }
    },
    created() {
      this.getEnderecos()
    },
    methods: {
      // método carrega enderecos
      getEnderecos() {
        EnderecosServices.getEnderecos().then( response => {
          this.enderecos = response.data.filter( enderecos => enderecos.clienteId == this.fieldClienteId)
        })
      },
      // método inclusão modal
      incluir() {
        this.clearForm()
        this.modal = 'new'
        this.$refs.modalEndereco.show()
      },
      // método salvar modal
      salvar(form) {
        this.form.clienteId = this.fieldClienteId
        this.form.id = undefined
        EnderecosServices.postEndereco(form).then( () => {
        this.showToast('INCLUSÃO', `Endereco incluído com sucesso`, 'success')
        this.$refs.modalEndereco.hide()
        this.getEnderecos()
        })
      },
      // método update modal
      update(form) {
        EnderecosServices.putEndereco(form).then( () => {
        this.showToast('ALTERAÇÃO', `Endereco alterado com sucesso`, 'success')        
        this.$refs.modalEndereco.hide()
        this.getEnderecos()
        })
      },
      // método edição grid
      editarModal(endereco) {
        this.form = endereco
        this.modal = 'edit'
        this.$refs.modalEndereco.show()
      },
      // método exclusão grid
      excluir(id) {
        EnderecosServices.deleteEndereco(id).then( () => {
          this.showToast('EXCLUSÃO', `Endereco excluido com sucesso`, 'success')
          this.getEnderecos()
        })
      },
       // método esconde modal
      hideModal() {
        this.$refs.modalEndereco.hide()
      },
      // mostra os tipos no select do grid      
      selectedTipo(tipo) {
        if (tipo == 0) return 'Cobrança'
        if (tipo == 1) return 'Comercial'
        if (tipo == 2) return 'Correspondência'
        if (tipo == 3) return 'Entrega'
        if (tipo == 4) return 'Residencial'
      },
      // limpa o form
      clearForm() {
        this.form = {
          id: null,
          tipo: null,
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cidade: null,
          uf: null,
          cep: null,
          clienteId: null
        }                
      }      
    }
  }
</script>

<style scoped>

</style>
