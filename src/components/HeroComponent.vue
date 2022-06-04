<template>
  <div id="main-banner">
      <span class="title">Controle de Clientes</span>
      <span class="sub-title">App desenvolvida em VueJs</span>
      <b-col lg="4" class="ml-4 mt-2">
        <b-button type="button" variant="success" to="/clientes" v-b-tooltip.hover="{ variant: 'secondary' }" title="Acessar Clientes"><b-icon icon="people-fill" class="mr-1"></b-icon>Clientes</b-button>  
      </b-col>
  </div>
</template>

<script>
  export default {
    name: 'HeroComponent'
  }
</script>

<style scoped>
  #main-banner {
    width: 100%;
    min-height: 460px;
    color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background-image: url('@/assets/hero.jpg');
    background-size: cover;
    overflow-x: hidden;   
  }

  .title {
    margin-left: 40px;
    margin-top: 40px;
    font-size: 50px;
  }

  .sub-title {
    margin-left: 40px;
    font-size: 30px;
  }

  @media only screen and (max-width: 600px) {
    #main-banner {
      display: flex;
      justify-content: start;
      padding-top: 30px;
      background-image: url('@/assets/heroSmall.jpg');
    }

    .title {
      margin-left: 40px;
      margin-top: 40px;
      font-size: 35px;
    }

    .sub-title {
      margin-left: 40px;
      font-size: 20px;
    }    
  }  
</style>
