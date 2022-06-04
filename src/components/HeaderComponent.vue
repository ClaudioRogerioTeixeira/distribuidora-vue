<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <!-- <b-navbar-brand href="#">Distribuidora</b-navbar-brand> -->
      <b-navbar-brand to="/">
        <img src="@/assets/logo.png" class="d-inline-block align-top" alt="Kitten">
        <!-- BootstrapVue -->
      </b-navbar-brand>      

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav  class="ml-auto">
          <b-nav-item to="/" v-b-tooltip.hover title="Home"><b-icon icon="house-door-fill"></b-icon></b-nav-item>
          <b-nav-item to="/clientes" v-b-tooltip.hover title="Cadastro de Clientes"><b-icon icon="people-fill"></b-icon></b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'HeaderComponent'
  }
</script>

<style scoped>

</style>
