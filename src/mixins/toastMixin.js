export default {
  methods: {
    showToast(titulo, descricao, variant) {
      this.$root.$bvToast.toast(descricao, {
        title: titulo,
        autoHideDelay: 5000,
        variant: variant,
        solid: true
      })   
    }      
  }
}