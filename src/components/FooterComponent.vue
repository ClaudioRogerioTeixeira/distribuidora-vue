<template>
  <div>
    <footer class="text-center text-lg-start">
      <div class="text-center p-3">
        © 2022 Copyright -
        <a href="https://claudiorogerioteixeira.github.io/portfolio/" target="blank">ZeroGrau Bebidas</a>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'FooterComponent'
  }
</script>

<style scoped>
  footer {
    background-color: #28A745;
    color: #fff;
    width: 100%;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 1000;
  }

  footer a {
     text-decoration: none;
     color: white;
  }
</style>