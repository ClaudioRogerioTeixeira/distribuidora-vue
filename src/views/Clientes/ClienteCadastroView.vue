<template>
  <div class="container mt-2 pb-5">
    <b-alert show variant="success">{{form.id ? 'Alteração de Cliente' : 'Inclusão de Cliente'}}</b-alert>

    <!-- tabs -->
    <div>
      <b-tabs content-class="mt-2" justified active-nav-item-class="font-weight-bold text-uppercase text-success">
        <!-- tab dados cadastrais -->
        <b-tab title="Dados Cadastrais" active>
          <b-container>
            <b-form class="mt-2"> <!-- @submit="save(form)" -->
              <b-row>
                <!-- selected tipo -->
                <b-col md="3" sm="12">
                  <b-form-group label="Tipo" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group id="tipo" v-model="form.tipo" :options="options" :aria-describedby="ariaDescribedby" name="tipo"></b-form-radio-group>
                  </b-form-group>
                </b-col>
                <!-- input nome -->
                <b-col md="9" sm="12">
                  <b-form-group id="nome-group" label="Nome" label-for="nome">
                    <b-form-input id="nome" v-model="form.nome" placeholder="Digite o nome" :state="validationNome" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}"></b-form-input>
                    <b-form-invalid-feedback :state="validationNome">
                      Nome deve ter no mínimo 5 caracteres
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="validationNome">
                      Nome válido
                    </b-form-valid-feedback>        
                  </b-form-group>
                </b-col>      
              </b-row>
  
              <b-form-row>
                <!-- input cnpjCpf -->
                <b-col md="3" sm="6">
                  <b-form-group id="cnpjCpf-group" label="Cnpj/Cpf" label-for="cnpjCpf">
                    <b-form-input id="cnpjCpf" v-model="form.cnpjCpf" placeholder="Digite o CnpjCpf" :state="validationCnpjCpf" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}" v-mask="form.tipo == 0 ? '##.###.###/####-##' : '###.###.###-##'"></b-form-input>
                    <b-form-invalid-feedback :state="validationCnpjCpf">
                      Cnpj/Cpf deve ter no mínimo 14 caracteres
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="validationCnpjCpf">
                      Cnpj/Cpf válido
                    </b-form-valid-feedback>        
                  </b-form-group>
                </b-col>                
                <!-- input rgIe -->
                <b-col md="3" sm="6">
                  <b-form-group id="rgIe-group" label="RG/Ie" label-for="rgIe">
                    <b-form-input id="rgIe" v-model="form.rgIe" placeholder="Digite o Rg/Ie" :state="validationRgIe" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}" v-mask="'##############'"></b-form-input>
                    <b-form-invalid-feedback :state="validationRgIe">
                      Rg/Ie deve ter no mínimo 9 caracteres
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="validationRgIe">
                      Rg/Ie válido
                    </b-form-valid-feedback>        
                  </b-form-group>          
                </b-col>
                <!-- input dataNasc_fundacao -->
                <b-col md="3" sm="6">
                  <b-form-group id="dataNasc_fundacao-group" label="Data Nasc./Fundação" label-for="dataNasc_fundacao">
                    <b-form-datepicker id="dataNasc_fundacao" v-model="form.dataNasc_fundacao" label-no-date-selected="Selecione uma data" locale="pt-BR" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}"></b-form-datepicker> <!-- :state="validationData" -->
                  </b-form-group>          
                </b-col>
                <!-- input dataNasc_fundacao -->
                <b-col md="3" sm="6">
                  <b-form-group id="dataCadastro-group" label="Data Cadastro" label-for="dataCadastro">
                    <b-form-datepicker id="dataCadastro" v-model="form.dataCadastro" label-no-date-selected="Selecione uma data" locale="pt-BR" :min="getToday()" required></b-form-datepicker>
                  </b-form-group>          
                </b-col>
              </b-form-row>
              <b-form-row>
                <!-- input email -->
                <b-col cols="12">
                  <b-form-group id="email-group" label="Email" label-for="email">
                    <b-form-input type="email" id="email" v-model="form.email" placeholder="Digite o email" :state="validationEmail" required></b-form-input>
                    <b-form-invalid-feedback :state="validationEmail">
                      Email deve ter no mínimo 10 caracteres
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="validationEmail">
                      Email válido
                    </b-form-valid-feedback>        
                  </b-form-group>
                </b-col>      
              </b-form-row>    
              <!-- botoes -->
              <b-form-row class="mb-5">
                <b-col class="col-12 d-flex justify-content-end">
                  <b-button type="reset" variant="outline-danger" v-b-tooltip.hover="{ variant: 'danger' }" title="Cancelar Cliente" class="mr-1" v-on:click="cancel"><b-icon icon="box-arrow-up-left" class="mr-1"></b-icon>Cancelar</b-button>
                  <b-button type="button" variant="outline-success" v-b-tooltip.hover="{ variant: 'success' }" title="Salvar Cliente" v-if="!form.id" v-on:click.prevent="save(form)"><b-icon icon="save" class="mr-1"></b-icon>Salvar</b-button> <!-- :disabled="!getValidation"-->
                  <b-button type="button" variant="outline-warning" v-b-tooltip.hover="{ variant: 'warning' }" title="Alterar Cliente"  v-on:click.prevent="update(form)" v-if="form.id"><b-icon icon="arrow-clockwise" class="mr-1"></b-icon>Alterar</b-button> <!-- :disabled="!getValidation" -->
                </b-col>
              </b-form-row>      
          </b-form>           
          </b-container>
        </b-tab>

        <!-- tab enderecos -->
        <b-tab title="Enderecos" :disabled="!form.id">
          <EnderecosGridComponent :fieldClienteId="form.id" />
        </b-tab>

        <!-- tab telefones -->
        <b-tab title="Telefones" :disabled="!form.id">
          <TelefonesGridComponent :fieldClienteId="form.id" />
        </b-tab>

      </b-tabs>        
    </div>

  </div>
</template>

<script>
  import ClientesServices from '@/services/clientesServices'
  import ToastMixin from '@/mixins/toastMixin.js'
  import EnderecosGridComponent from '@/components/EnderecosComponent/EnderecosGridComponent.vue'
  import TelefonesGridComponent from '@/components/TelefonesComponent/TelefonesGridComponent.vue'

  export default {
    name: 'ClienteCadastroView',
    components: { EnderecosGridComponent, TelefonesGridComponent },
    mixins: [ToastMixin],
    data() {
      return {
        options: [
          { value: '0', text: 'Jurídico' },
          { value: '1', text: 'Físico' },
        ],
        form: {
          id: '',
          tipo: '0',
          nome: '',
          cnpjCpf: '',
          rgIe: '',
          dataNasc_fundacao: '',
          dataCadastro: '', //new Date()
          email: ''
        },        
      }
    },
    created() {
      this.form.id = this.$route.params.id
      if (this.form.id) {
        ClientesServices.getCliente(this.form.id).then( response => {
          this.form = response.data
        })
      }      
    },
    methods: {   
      save(form) {
        // eslint-disable-next-line no-debugger
        debugger
        ClientesServices.postCliente(form).then( response => {
        const firstName = response.data.nome.split(' ', 1).join()
        this.showToast('Sucesso', `Cliente ${firstName} incluido com sucesso`, 'success')
        this.clearForm()          
        this.$router.push({ name: 'clientes' })          
        })
      },
      update(form) {
        ClientesServices.putCliente(form).then( () => {         
          this.showToast('Sucesso', `Cliente alterado com sucesso`, 'success')
          this.clearForm()          
          this.$router.push({ name: 'clientes' })          
        })
      },
      cancel() {
        this.clearForm()          
        this.$router.push({ name: 'clientes' })
      },      
      getToday() {
        return new Date().toISOString().split("T")[0]
      },
      clearForm() {
        this.form = {
          id: null,
          tipo: 0,
          nome: null,
          cnpjCpf: null,
          rgIe: null,
          dataNasc_fundacao: null,
          dataCadastro: new Date(),
          email: null
        }                
      }
    },
    computed: {
      validationNome() { return this.form.nome.length > 5 },
      validationCnpjCpf() { return this.form.cnpjCpf.length > 13 },
      validationRgIe() { return this.form.rgIe.length > 8  }, //&& this.rgIe.length < 13
      validationEmail() { return this.form.email.length > 10 },
    },

  }
</script>

<style scoped>

</style>