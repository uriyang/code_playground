<template>
  <a-layout id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </a-layout>
</template>

<script>
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
