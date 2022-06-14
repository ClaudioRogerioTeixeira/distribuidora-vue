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
                  <b-form-group id="nome-group" label="Nome" label-for="nome" :messages="{ required: 'Campo nome obrigatório' }">
                    <b-form-input id="nome" v-model.trim="$v.form.nome.$model" :class="{ error: $v.form.nome.$error }" placeholder="" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}"></b-form-input>
                    <b-form-text v-if="$v.form.nome.$dirty">
                        <p class="error-message" v-if="!$v.form.nome.required">
                          Digite um nome válido
                        </p>
                        <p class="error-message" v-if="!$v.form.nome.minLength">
                          Campo obrigatório (mínimo 5 caracteres)
                        </p>
                    </b-form-text>                    
                  </b-form-group>
                </b-col>      
              </b-row>
  
              <b-form-row>
                <!-- input cnpjCpf -->
                <b-col md="3" sm="6">
                  <b-form-group id="cnpjCpf-group" label="Cnpj/Cpf" label-for="cnpjCpf">
                    <b-form-input id="cnpjCpf" v-model.trim="$v.form.cnpjCpf.$model" :class="{ error: $v.form.cnpjCpf.$error }" placeholder="" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}" v-mask="form.tipo == 0 ? '##.###.###/####-##' : '###.###.###-##'"></b-form-input> <!-- :class="{ error: $v.form.cnpjCpf.$error }" -->
                    <b-form-text v-if="$v.form.nome.$dirty">
                        <p class="error-message" v-if="!$v.form.cnpjCpf.required">
                          {{form.tipo == 0 ? 'Digite um CNPJ válido' : 'Digite um CPF válido'}}
                        </p>
                        <p class="error-message" v-if="!$v.form.cnpjCpf.minLength">
                          {{form.tipo == 0 ? 'Campo obrigatório (mínimo 14 caracteres)' : 'Campo obrigatório (mínimo 11 caracteres)'}}
                        </p>
                    </b-form-text>     
                  </b-form-group>
                </b-col>                
                <!-- input rgIe -->
                <b-col md="3" sm="6">
                  <b-form-group id="rgIe-group" label="RG/Ie" label-for="rgIe">
                    <b-form-input id="rgIe" v-model.trim="$v.form.rgIe.$model" :class="{ error: $v.form.rgIe.$error }" placeholder="" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}" v-mask="'##############'"></b-form-input>
                    <b-form-text v-if="$v.form.rgIe.$dirty">
                        <p class="error-message" v-if="!$v.form.rgIe.required">
                          {{form.tipo == 0 ? 'Digite um RG válido' : 'Digite um IE válido'}}
                        </p>
                        <p class="error-message" v-if="!$v.form.rgIe.minLength">
                          {{form.tipo == 0 ? 'Campo obrigatório (mínimo 14 caracteres)' : 'Campo obrigatório (mínimo 14 caracteres)'}}
                        </p>
                    </b-form-text>                      
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
                    <b-form-input type="email" id="email" v-model.trim="$v.form.email.$model" :class="{ error: $v.form.email.$error }" placeholder="" required oninvalid="this.setCustomValidity('Campo obrigatório')" onchange="try{setCustomValidity('')}catch(e){}"></b-form-input>
                    <b-form-text v-if="$v.form.email.$dirty">
                        <p class="error-message" v-if="!$v.form.email.required">
                          Campo obrigatório
                        </p>
                        <p class="error-message" v-if="!$v.form.email.email">
                          Digite um email válido
                        </p>
                    </b-form-text> 
                  </b-form-group>
                </b-col>      
              </b-form-row>    
              <!-- botoes -->
              <b-form-row class="mb-5">
                <b-col class="col-12 d-flex justify-content-end">
                  <b-button type="reset" variant="outline-danger" v-b-tooltip.hover="{ variant: 'danger' }" title="Cancelar Cliente" class="mr-1" v-on:click="cancel"><b-icon icon="box-arrow-up-left" class="mr-1"></b-icon>Cancelar</b-button>
                  <b-button type="submit" variant="outline-success" v-b-tooltip.hover="{ variant: 'success' }" title="Salvar Cliente" v-if="!form.id" v-on:click.prevent="save(form)"><b-icon icon="save" class="mr-1"></b-icon>Salvar</b-button> <!-- :disabled="!getValidation" -->
                  <b-button type="submit" variant="outline-warning" v-b-tooltip.hover="{ variant: 'warning' }" title="Alterar Cliente"  v-on:click.prevent="update(form)" v-if="form.id"><b-icon icon="arrow-clockwise" class="mr-1"></b-icon>Alterar</b-button>
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
      <!-- 
      <b-card class="mb-5" header="Resultado">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
       -->
    </div>

  </div>
</template>

<script>
  import ClientesServices from '@/services/clientesServices'
  import ToastMixin from '@/mixins/toastMixin.js'
  import EnderecosGridComponent from '@/components/EnderecosComponent/EnderecosGridComponent.vue'
  import TelefonesGridComponent from '@/components/TelefonesComponent/TelefonesGridComponent.vue'
  import { required, minLength, email } from 'vuelidate/lib/validators'

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
        },
        rgIe: {
          required,
          minLength: minLength(14),
        },
        email: {
          required,
          email
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
        this.$v.$touch()
        if(this.$v.$error) return
        ClientesServices.postCliente(form).then( response => {
        const firstName = response.data.nome.split(' ', 1).join()
        this.showToast('Sucesso', `Cliente ${firstName} incluido com sucesso`, 'success')
        this.clearForm()          
        this.$router.push({ name: 'clientes' })          
        })
      },
      // altera o cliente
      update(form) {
        this.$v.$touch()
        if(this.$v.$error) return
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
    }
  }
</script>

<style scoped>
  .error {
    border: 3px solid rgba( 220, 20, 60, 0.5);
  }
  .error-message {
    color: rgba( 220, 20, 60, 1);
  }
</style>