<template>
  <div class="container mt-2 pb-5">
    <b-alert show variant="success">{{form.id ? 'Alteração de Cliente' : 'Inclusão de Cliente'}}</b-alert>

    <!-- tabs -->
    <div>
      <b-tabs content-class="mt-2" justified active-nav-item-class="font-weight-bold text-uppercase text-success">
        <!-- tab dados cadastrais -->
        <b-tab title="Dados Cadastrais" active>
          <b-container>
            <b-form class="mt-2">
              <b-row>
                <!-- selected tipo -->
                <b-col md="3" sm="12">
                  <b-form-group label="Tipo" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group id="tipo" v-model="form.tipo" :options="options" :aria-describedby="ariaDescribedby" name="tipo"></b-form-radio-group>
                    <b-form-text id="ariaDescribedby" text-variant="danger">
                      Selecione o tipo do cliente
                    </b-form-text>                    
                  </b-form-group>
                </b-col>
                <!-- input nome -->
                <b-col md="9" sm="12">
                  <b-form-group id="nome-group" label="Nome" label-for="nome">
                    <b-form-input id="nome" v-model.trim="$v.form.nome.$model" :state="getValidation" aria-describedby="nome-feedback" placeholder="Digite o nome" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}"></b-form-input> <!-- :class="{ error: $v.form.nome.$error }" -->
                    <b-form-invalid-feedback id="nome-feedback">Campo obrigatório (mínimo 5 caracteres)</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>      
              </b-row>
  
              <b-form-row>
                <!-- input cnpjCpf -->
                <b-col md="3" sm="6">
                  <b-form-group id="cnpjCpf-group" label="Cnpj/Cpf" label-for="cnpjCpf">
                    <b-form-input id="cnpjCpf" v-model.trim="$v.form.cnpjCpf.$model" :state="getValidation" aria-describedby="cnpjCpf-feedback" placeholder="Digite o CnpjCpf" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}" v-mask="form.tipo == 0 ? '##.###.###/####-##' : '###.###.###-##'"></b-form-input> <!-- :class="{ error: $v.form.cnpjCpf.$error }" -->
                    <b-form-invalid-feedback id="cnpjCpf-feedback">{{ form.tipo == 0 ? 'Campo obrigatório (14 caracteres)' : 'Campo obrigatório (9 caracteres)' }}</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>                
                <!-- input rgIe -->
                <b-col md="3" sm="6">
                  <b-form-group id="rgIe-group" label="RG/Ie" label-for="rgIe">
                    <b-form-input id="rgIe" v-model="form.rgIe" placeholder="Digite o Rg/Ie" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}" v-mask="'##############'"></b-form-input>
                  </b-form-group>          
                </b-col>
                <!-- input dataNasc_fundacao -->
                <b-col md="3" sm="6">
                  <b-form-group id="dataNasc_fundacao-group" label="Data Nasc./Fundação" label-for="dataNasc_fundacao">
                    <b-form-datepicker id="dataNasc_fundacao" v-model="form.dataNasc_fundacao" label-no-date-selected="Selecione uma data" locale="pt-BR" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}"></b-form-datepicker>
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
                    <b-form-input type="email" id="email" v-model="form.email" placeholder="Digite o email" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}"></b-form-input>
                  </b-form-group>
                </b-col>      
              </b-form-row>    
              <!-- botoes -->
              <b-form-row class="mb-5">
                <b-col class="col-12 d-flex justify-content-end">
                  <b-button type="reset" variant="outline-danger" v-b-tooltip.hover="{ variant: 'danger' }" title="Cancelar Cliente" class="mr-1" v-on:click="cancel"><b-icon icon="box-arrow-up-left" class="mr-1"></b-icon>Cancelar</b-button>
                  <b-button type="submit" variant="outline-success" v-b-tooltip.hover="{ variant: 'success' }" title="Salvar Cliente" v-if="!form.id" v-on:click.prevent="save(form)" :disabled="!getValidation"><b-icon icon="save" class="mr-1"></b-icon>Salvar</b-button>
                  <b-button type="submit" variant="outline-warning" v-b-tooltip.hover="{ variant: 'warning' }" title="Alterar Cliente"  v-on:click="update(form)" v-if="form.id" :disabled="!getValidation"><b-icon icon="arrow-clockwise" class="mr-1"></b-icon>Alterar</b-button>
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
      
      <!-- conteúdo form -->
      <b-card class="mb-5" header="Resultado">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>

  </div>
</template>

<script>
  import ClientesServices from '@/services/clientesServices'
  import ToastMixin from '@/mixins/toastMixin.js'
  import EnderecosGridComponent from '@/components/EnderecosComponent/EnderecosGridComponent.vue'
  import TelefonesGridComponent from '@/components/TelefonesComponent/TelefonesGridComponent.vue'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'

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
    // método define validações vuelidate
    validations: {
      form: {
        nome: {
          required,
          minLength: minLength(5),
        },
        cnpjCpf: {
          required,
          minLength: minLength(14),
          maxLength: maxLength(18)
        }        
      }
    },
    created() {
      // captura id pelo parametro da rota para selecionar o cliente
      this.form.id = this.$route.params.id
      if (this.form.id) {
        ClientesServices.getCliente(this.form.id).then( response => {
          this.form = response.data
        })
      }      
    },
    methods: {   
      // salva o cliente 
      save(form) {
        // this.$v.$touch()
        // if(this.$v.$error) return
        ClientesServices.postCliente(form).then( response => {
        const firstName = response.data.nome.split(' ', 1).join()
        this.showToast('Sucesso', `Cliente ${firstName} incluido com sucesso`, 'success')
        this.clearForm()          
        this.$router.push({ name: 'clientes' })          
        })
      },
      // altera o cliente
      update(form) {
        ClientesServices.putCliente(form).then( () => {         
          this.showToast('Sucesso', `Cliente alterado com sucesso`, 'success')
          this.clearForm()          
          this.$router.push({ name: 'clientes' })          
        })
      },
      // método cancela limpando o formulario e redirecionando para o grid
      cancel() {
        this.clearForm()          
        this.$router.push({ name: 'clientes' })
      },
      // método seleciona a data     
      getToday() {
        return new Date().toISOString().split("T")[0]
      },
      // limpa o formulário
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
      },
    },
    computed: {
      getValidation() { if(this.$v.form.nome.$dirty === false) { return null } else { return !this.$v.form.nome.$error } }
    }
  }
</script>

<style scoped>
  .error {
    border: 3px solid red;
  }
  .error-color {
    color: red;
  }
</style>